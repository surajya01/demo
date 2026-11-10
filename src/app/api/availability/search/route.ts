import { NextRequest, NextResponse } from "next/server";
import { AvailabilitySearchSchema } from "@apexify/validation";
import { bookingEngineService } from "@/services/booking-engine.service";
import { VERIFIED_ROOMS, type VerifiedRoom } from "@/config/catalog";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AvailabilitySearchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_SEARCH_PARAMS",
            message: "Invalid dates or guest count",
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    // Try live MySQL availability search
    try {
      const searchResult = await bookingEngineService.searchAvailability(validation.data);
      return NextResponse.json({
        success: true,
        source: "MYSQL_DATABASE",
        data: searchResult,
      });
    } catch (dbError) {
      logger.warn(
        "MySQL unavailable during availability search, serving fallback verified catalog",
        "AvailabilityAPI",
        { error: (dbError as Error).message }
      );

      // Fallback calculation using verified catalog
      const { checkIn, checkOut, adults, children, rooms } = validation.data;
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

      const availableRooms = VERIFIED_ROOMS.map((room: VerifiedRoom) => {
        const nightlyRate = room.basePrice;
        const subtotal = nightlyRate * nights * rooms;
        const taxes = Math.round(subtotal * 0.12);
        const total = subtotal + taxes;

        return {
          roomTypeId: room.id,
          slug: room.slug,
          name: room.name,
          shortDescription: room.shortDescription,
          maxAdults: room.maxAdults,
          maxChildren: room.maxChildren,
          maxOccupancy: room.maxOccupancy,
          isAvailable: true,
          availableUnits: room.slug === "deluxe-double-room" ? 3 : 2,
          requestedRooms: rooms,
          fitsGuestCount: room.maxOccupancy * rooms >= (adults + children),
          priceSummary: {
            currency: "INR",
            avgNightlyRate: nightlyRate,
            nights,
            roomsRequested: rooms,
            subtotal,
            taxes,
            taxBreakdown: {
              cgst: Math.round(taxes / 2),
              sgst: Math.round(taxes / 2),
              ratePercentage: 12,
            },
            totalAmount: total,
          },
        };
      });

      return NextResponse.json({
        success: true,
        source: "STATIC_CATALOG_FALLBACK",
        data: {
          searchCriteria: {
            checkIn,
            checkOut,
            nights,
            adults,
            children,
            rooms,
          },
          availableRoomTypesCount: availableRooms.length,
          rooms: availableRooms,
        },
      });
    }
  } catch (error) {
    logger.error("Availability search unexpected error", error, "AvailabilityAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SEARCH_FAILED",
          message: "Unable to complete search at this time.",
        },
      },
      { status: 500 }
    );
  }
}
