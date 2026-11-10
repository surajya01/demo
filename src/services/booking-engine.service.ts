/**
 * Apexify Resort - Core Booking Engine Service
 * Developed by Apexify
 * 
 * Implements:
 * 1. Live availability search with rate calculation and 12% GST breakdown
 * 2. Concurrency-safe temporary inventory holds (15-min TTL)
 * 3. Atomic booking creation with immutable price/policy snapshots
 * 4. Booking reference lookup and automated hold expiration
 */

import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { withTransaction } from "../../packages/database/src/transaction";
import {
  AvailabilitySearchInput,
  CreateBookingHoldInput,
  CreateBookingInput,
} from "@apexify/validation";
import { AppError, ConflictError, NotFoundError, ValidationError } from "../lib/errors";
import { logger } from "../lib/logger";
import { Prisma } from "@prisma/client";

export class BookingEngineService {
  /**
   * Generates a cryptographically secure token and its SHA-256 hash.
   */
  private generateHoldToken(): { rawToken: string; tokenHash: string } {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    return { rawToken, tokenHash };
  }

  /**
   * Generates a human-friendly unique booking reference (e.g. DR-202611-K9X2)
   */
  private generateBookingReference(): string {
    const now = new Date();
    const yearMonth = now.toISOString().slice(0, 7).replace("-", "");
    const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 4);
    return `DR-${yearMonth}-${randomChars}`;
  }

  /**
   * Release any expired active holds.
   */
  async sweepExpiredHolds(): Promise<number> {
    const now = new Date();
    const result = await prisma.bookingHold.updateMany({
      where: {
        status: "ACTIVE",
        expiresAt: { lt: now },
      },
      data: {
        status: "EXPIRED",
      },
    });

    if (result.count > 0) {
      logger.info(`Swept ${result.count} expired inventory holds`, "BookingEngineService");
    }
    return result.count;
  }

  /**
   * Search room availability across MySQL database with live rates and inventory.
   */
  async searchAvailability(input: AvailabilitySearchInput) {
    const checkIn = new Date(input.checkIn);
    const checkOut = new Date(input.checkOut);

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const checkInCopy = new Date(checkIn);
    checkInCopy.setHours(0, 0, 0, 0);

    if (checkInCopy < now) {
      throw new ValidationError("Check-in date cannot be in the past.");
    }

    if (checkOut <= checkIn) {
      throw new ValidationError("Check-out date must be after check-in date.");
    }

    const nights = Math.max(
      1,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    );

    // Sweep expired holds before calculating available units
    await this.sweepExpiredHolds();

    // Retrieve all published room types with their images, active rates, and rooms
    const roomTypes = await prisma.roomType.findMany({
      where: { isPublished: true },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        rooms: {
          where: { operationalStatus: "ACTIVE", isBookable: true },
        },
        rates: {
          where: { isActive: true },
          include: { ratePlan: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    const results = [];

    for (const rt of roomTypes) {
      const physicalCapacity = rt.rooms.length;
      if (physicalCapacity === 0) continue;

      // Check max occupancy
      const canFitGuests = rt.maxOccupancy * input.rooms >= (input.adults + input.children);

      // Fetch inventory rows for stayDate in [checkIn, checkOut)
      const inventoryRows = await prisma.roomInventory.findMany({
        where: {
          roomTypeId: rt.id,
          stayDate: { gte: checkIn, lt: checkOut },
        },
      });

      // Fetch active holds overlapping these dates
      const activeHolds = await prisma.bookingHold.findMany({
        where: {
          roomTypeId: rt.id,
          status: "ACTIVE",
          expiresAt: { gt: new Date() },
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      });

      // Calculate availability night by night
      let minAvailableUnits = physicalCapacity;
      const nightlyRates = [];

      const cursor = new Date(checkIn);
      while (cursor < checkOut) {
        const dateStr = cursor.toISOString().split("T")[0];
        const inv = inventoryRows.find(
          (row) => row.stayDate.toISOString().split("T")[0] === dateStr
        );

        const totalUnits = inv ? inv.totalUnits : physicalCapacity;
        const bookedUnits = inv ? inv.bookedUnits : 0;
        const blockedUnits = inv ? inv.blockedUnits : 0;

        // Sum holds active on this specific night
        const heldUnitsOnNight = activeHolds
          .filter((h) => h.checkIn <= cursor && h.checkOut > cursor)
          .reduce((sum, h) => sum + h.quantity, 0);

        const availableOnNight = Math.max(0, totalUnits - bookedUnits - blockedUnits - heldUnitsOnNight);
        if (availableOnNight < minAvailableUnits) {
          minAvailableUnits = availableOnNight;
        }

        // Nightly rate
        const dayOfWeek = cursor.getDay();
        const baseRate = Number(rt.basePrice);
        // Weekend surcharge (Fri/Sat) 15% standard or rate plan override
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
        const dailyRate = isWeekend ? Math.round(baseRate * 1.15) : baseRate;

        nightlyRates.push({
          date: dateStr,
          baseRate: dailyRate,
          isWeekend,
          availableUnits: availableOnNight,
        });

        cursor.setDate(cursor.getDate() + 1);
      }

      const isAvailable = minAvailableUnits >= input.rooms && canFitGuests;

      // Total pricing calculations
      const avgNightlyRate = Math.round(
        nightlyRates.reduce((sum, n) => sum + n.baseRate, 0) / nights
      );
      const subtotal = avgNightlyRate * nights * input.rooms;
      const taxRate = 0.12; // 12% GST
      const taxAmount = Math.round(subtotal * taxRate);
      const totalAmount = subtotal + taxAmount;

      // Meal plan options from rate plans
      const ratePlanOptions = rt.rates.map((r) => ({
        ratePlanId: r.ratePlan.id,
        planCode: r.ratePlan.code,
        planName: r.ratePlan.name,
        mealPlan: r.ratePlan.mealPlan || "Room Only (EP)",
        baseAmountPerNight: Number(r.baseAmount),
        cancellationPolicy: r.ratePlan.cancellationPolicy || "Free cancellation up to 48 hours before check-in.",
      }));

      // Fallback EP plan if none explicitly seeded
      if (ratePlanOptions.length === 0) {
        ratePlanOptions.push({
          ratePlanId: "default-ep",
          planCode: "EP",
          planName: "European Plan (Room Only)",
          mealPlan: "Room Only",
          baseAmountPerNight: avgNightlyRate,
          cancellationPolicy: "Free cancellation up to 48 hours prior to arrival.",
        });
      }

      results.push({
        roomTypeId: rt.id,
        slug: rt.slug,
        name: rt.name,
        shortDescription: rt.shortDescription,
        description: rt.description,
        maxAdults: rt.maxAdults,
        maxChildren: rt.maxChildren,
        maxOccupancy: rt.maxOccupancy,
        bedConfiguration: rt.bedConfiguration,
        sizeSqFt: rt.sizeSqFt,
        coverImage: rt.images.find((i) => i.isCover)?.storagePath || rt.images[0]?.storagePath || "/images/placeholders/room_placeholder.svg",
        galleryImages: rt.images.map((i) => i.storagePath),
        isAvailable,
        availableUnits: minAvailableUnits,
        requestedRooms: input.rooms,
        fitsGuestCount: canFitGuests,
        priceSummary: {
          currency: "INR",
          avgNightlyRate,
          nights,
          roomsRequested: input.rooms,
          subtotal,
          taxes: taxAmount,
          taxBreakdown: {
            cgst: Math.round(taxAmount / 2),
            sgst: Math.round(taxAmount / 2),
            ratePercentage: 12,
          },
          totalAmount,
        },
        ratePlans: ratePlanOptions,
        nightlyBreakdown: nightlyRates,
      });
    }

    return {
      searchCriteria: {
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        nights,
        adults: input.adults,
        children: input.children,
        rooms: input.rooms,
      },
      availableRoomTypesCount: results.filter((r) => r.isAvailable).length,
      rooms: results,
    };
  }

  /**
   * Create a 15-minute temporary inventory hold using atomic SERIALIZABLE transaction.
   */
  async createHold(input: CreateBookingHoldInput) {
    const checkIn = new Date(input.checkIn);
    const checkOut = new Date(input.checkOut);
    const quantity = input.quantity || 1;

    // Clean expired holds
    await this.sweepExpiredHolds();

    const holdTtlMinutes = 15;
    const expiresAt = new Date(Date.now() + holdTtlMinutes * 60 * 1000);
    const { rawToken, tokenHash } = this.generateHoldToken();

    return withTransaction(async (tx) => {
      // 1. Verify RoomType exists and is active
      const roomType = await tx.roomType.findUnique({
        where: { id: input.roomTypeId },
        include: {
          rooms: { where: { operationalStatus: "ACTIVE", isBookable: true } },
        },
      });

      if (!roomType) {
        throw new NotFoundError("Room type not found.");
      }

      const physicalRooms = roomType.rooms.length;

      // 2. Fetch inventory rows
      const inventoryRows = await tx.roomInventory.findMany({
        where: {
          roomTypeId: input.roomTypeId,
          stayDate: { gte: checkIn, lt: checkOut },
        },
      });

      // 3. Fetch active holds overlapping
      const activeHolds = await tx.bookingHold.findMany({
        where: {
          roomTypeId: input.roomTypeId,
          status: "ACTIVE",
          expiresAt: { gt: new Date() },
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      });

      // 4. Verify availability for every stay night
      const cursor = new Date(checkIn);
      while (cursor < checkOut) {
        const dateStr = cursor.toISOString().split("T")[0];
        const inv = inventoryRows.find(
          (row) => row.stayDate.toISOString().split("T")[0] === dateStr
        );

        const total = inv ? inv.totalUnits : physicalRooms;
        const booked = inv ? inv.bookedUnits : 0;
        const blocked = inv ? inv.blockedUnits : 0;

        const heldOnNight = activeHolds
          .filter((h) => h.checkIn <= cursor && h.checkOut > cursor)
          .reduce((sum, h) => sum + h.quantity, 0);

        const availableOnNight = total - booked - blocked - heldOnNight;

        if (availableOnNight < quantity) {
          throw new ConflictError(
            `Insufficient inventory on ${dateStr}. Requested ${quantity} units, but only ${Math.max(0, availableOnNight)} available.`
          );
        }

        cursor.setDate(cursor.getDate() + 1);
      }

      // 5. Insert hold record
      const hold = await tx.bookingHold.create({
        data: {
          holdTokenHash: tokenHash,
          roomTypeId: input.roomTypeId,
          checkIn,
          checkOut,
          quantity,
          status: "ACTIVE",
          expiresAt,
        },
      });

      const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
      const nightlyRate = Number(roomType.basePrice);
      const subtotal = nightlyRate * nights * quantity;
      const taxes = Math.round(subtotal * 0.12);
      const totalAmount = subtotal + taxes;

      logger.info(`Created inventory hold ${hold.id} for ${quantity} rooms (${roomType.name})`, "BookingEngineService");

      return {
        holdId: hold.id,
        holdToken: rawToken,
        roomTypeId: roomType.id,
        roomTypeName: roomType.name,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        nights,
        quantity,
        expiresAt: expiresAt.toISOString(),
        expiresInSeconds: holdTtlMinutes * 60,
        estimatedPrice: {
          nightlyRate,
          subtotal,
          taxes,
          totalAmount,
          currency: "INR",
        },
      };
    });
  }

  /**
   * Finalize reservation from an active hold.
   * Atomically commits guest details, creates booking, and increments inventory.
   */
  async confirmBooking(input: CreateBookingInput) {
    const tokenHash = crypto.createHash("sha256").update(input.holdToken).digest("hex");

    return withTransaction(async (tx) => {
      // 1. Retrieve and validate the hold
      const hold = await tx.bookingHold.findUnique({
        where: { holdTokenHash: tokenHash },
        include: {
          roomType: {
            include: {
              rooms: { where: { operationalStatus: "ACTIVE", isBookable: true } },
            },
          },
        },
      });

      if (!hold) {
        throw new NotFoundError("Booking hold token not found.");
      }

      if (hold.status !== "ACTIVE") {
        throw new ValidationError(`This reservation hold is no longer active (status: ${hold.status}). Please search again.`);
      }

      if (new Date() > hold.expiresAt) {
        await tx.bookingHold.update({
          where: { id: hold.id },
          data: { status: "EXPIRED" },
        });
        throw new ValidationError("Your reservation hold has expired. Please search availability and try again.");
      }

      // 2. Find or create lead guest
      let guest = await tx.guest.findFirst({
        where: { phone: input.guest.phone },
      });

      if (guest) {
        guest = await tx.guest.update({
          where: { id: guest.id },
          data: {
            fullName: input.guest.fullName,
            email: input.guest.email || guest.email,
            address: input.guest.address || guest.address,
            city: input.guest.city || guest.city,
            state: input.guest.state || guest.state,
            pincode: input.guest.pincode || guest.pincode,
          },
        });
      } else {
        guest = await tx.guest.create({
          data: {
            fullName: input.guest.fullName,
            phone: input.guest.phone,
            email: input.guest.email || null,
            address: input.guest.address || null,
            city: input.guest.city || null,
            state: input.guest.state || null,
            pincode: input.guest.pincode || null,
            country: input.guest.country || "India",
          },
        });
      }

      // 3. Calculate final amounts and snapshots
      const nights = Math.max(
        1,
        Math.ceil((hold.checkOut.getTime() - hold.checkIn.getTime()) / (1000 * 60 * 60 * 24))
      );
      const nightlyRate = Number(hold.roomType.basePrice);
      const subtotal = nightlyRate * nights * hold.quantity;
      const taxAmount = Math.round(subtotal * 0.12);
      const totalAmount = subtotal + taxAmount;

      const priceSnapshot = {
        currency: "INR",
        roomTypeId: hold.roomTypeId,
        roomTypeName: hold.roomType.name,
        nightlyRate,
        nights,
        roomsCount: hold.quantity,
        subtotal,
        taxPercentage: 12,
        taxAmount,
        totalAmount,
      };

      const policySnapshot = {
        checkInTime: "12:00 PM",
        checkOutTime: "10:00 AM",
        cancellationPolicy: "Free cancellation up to 48 hours prior to scheduled check-in. Cancellations within 48 hours are subject to a 1-night charge.",
        idRequirement: "Valid Government ID (Aadhaar, Passport, Driving License) required for all adults at check-in.",
        petPolicy: "Pets are not permitted on resort premises.",
        poolPolicy: "Proper swimming attire required. Pool hours: 7:00 AM to 7:00 PM.",
      };

      const bookingReference = this.generateBookingReference();

      // 4. Create Booking
      const booking = await tx.booking.create({
        data: {
          bookingReference,
          leadGuestId: guest.id,
          checkIn: hold.checkIn,
          checkOut: hold.checkOut,
          adults: hold.quantity * 2,
          children: 0,
          status: input.paymentMethod === "PAY_AT_PROPERTY" ? "CONFIRMED" : "AWAITING_PAYMENT",
          source: "WEBSITE",
          subtotal: new Prisma.Decimal(subtotal),
          taxAmount: new Prisma.Decimal(taxAmount),
          discountAmount: new Prisma.Decimal(0),
          totalAmount: new Prisma.Decimal(totalAmount),
          currency: "INR",
          priceSnapshot,
          policySnapshot,
          specialRequests: input.specialRequests || null,
        },
      });

      // 5. Create BookingRoom entry
      // Assign physical rooms if available
      const physicalRooms = hold.roomType.rooms;
      for (let i = 0; i < hold.quantity; i++) {
        const assignedRoom = physicalRooms[i] ? physicalRooms[i].id : null;

        await tx.bookingRoom.create({
          data: {
            bookingId: booking.id,
            roomTypeId: hold.roomTypeId,
            roomId: assignedRoom,
            quantity: 1,
            nightlyRateSnapshot: {
              nightlyRate,
              nights,
              subtotal: nightlyRate * nights,
            },
          },
        });
      }

      // 6. Update RoomInventory: increment bookedUnits for each stay night
      const cursor = new Date(hold.checkIn);
      while (cursor < hold.checkOut) {
        const dateStr = cursor.toISOString().split("T")[0];
        const stayDate = new Date(dateStr);

        const existingInv = await tx.roomInventory.findUnique({
          where: {
            roomTypeId_stayDate: {
              roomTypeId: hold.roomTypeId,
              stayDate,
            },
          },
        });

        if (existingInv) {
          await tx.roomInventory.update({
            where: { id: existingInv.id },
            data: { bookedUnits: { increment: hold.quantity } },
          });
        } else {
          await tx.roomInventory.create({
            data: {
              roomTypeId: hold.roomTypeId,
              stayDate,
              totalUnits: hold.roomType.rooms.length || hold.quantity,
              bookedUnits: hold.quantity,
              blockedUnits: 0,
            },
          });
        }

        cursor.setDate(cursor.getDate() + 1);
      }

      // 7. Mark hold as CONVERTED
      await tx.bookingHold.update({
        where: { id: hold.id },
        data: { status: "CONVERTED" },
      });

      logger.info(
        `Successfully confirmed reservation ${bookingReference} for ${guest.fullName}`,
        "BookingEngineService"
      );

      return {
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        status: booking.status,
        checkIn: hold.checkIn.toISOString().split("T")[0],
        checkOut: hold.checkOut.toISOString().split("T")[0],
        nights,
        roomType: hold.roomType.name,
        roomsCount: hold.quantity,
        guest: {
          fullName: guest.fullName,
          phone: guest.phone,
          email: guest.email,
        },
        pricing: priceSnapshot,
        policy: policySnapshot,
        createdAt: booking.createdAt.toISOString(),
      };
    });
  }

  /**
   * Retrieve confirmed booking details by human-friendly reference (e.g. DR-202611-A8K2).
   */
  async getBookingByReference(bookingReference: string) {
    const booking = await prisma.booking.findUnique({
      where: { bookingReference },
      include: {
        leadGuest: true,
        bookingRooms: {
          include: {
            roomType: {
              include: {
                images: { where: { isCover: true } },
              },
            },
            room: true,
          },
        },
        payments: true,
      },
    });

    if (!booking) {
      throw new NotFoundError(`Booking reference '${bookingReference}' was not found.`);
    }

    return booking;
  }
}

export const bookingEngineService = new BookingEngineService();

