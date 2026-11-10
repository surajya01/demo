/**
 * Dhuri Resort - Enquiry & Reservation Management Service
 * Developed by Apexify
 */

import { prisma } from "../lib/prisma";
import { CreateEnquiryInput, UpdateEnquiryInput } from "@dhuri/validation";
import { logger } from "../lib/logger";
import { NotFoundError } from "../lib/errors";
import { EnquiryStatus } from "@prisma/client";

export class BookingService {
  /**
   * Submit an initial booking enquiry.
   * Keeps enquiry workflow strictly decoupled from confirmed reservations.
   */
  async createEnquiry(input: CreateEnquiryInput) {
    logger.info("Recording new booking enquiry", "BookingService", { guestName: input.guestName });

    let preferredRoomTypeId: string | null = null;
    if (input.preferredRoomTypeId && input.preferredRoomTypeId.trim()) {
      // Validate that the room type exists
      const rt = await prisma.roomType.findFirst({
        where: {
          OR: [
            { id: input.preferredRoomTypeId },
            { slug: input.preferredRoomTypeId },
          ],
        },
      });
      if (rt) {
        preferredRoomTypeId = rt.id;
      }
    }

    return prisma.bookingEnquiry.create({
      data: {
        guestName: input.guestName,
        phone: input.phone,
        email: input.email || null,
        checkIn: input.checkIn ? new Date(input.checkIn) : null,
        checkOut: input.checkOut ? new Date(input.checkOut) : null,
        adults: input.adults || 2,
        children: input.children || 0,
        preferredRoomTypeId,
        message: input.message || null,
        status: "PENDING",
      },
      include: {
        preferredRoomType: {
          select: { name: true, basePrice: true, slug: true },
        },
      },
    });
  }

  /**
   * Fetch enquiries with optional status filter and pagination
   */
  async listEnquiries(options?: {
    status?: EnquiryStatus;
    limit?: number;
    offset?: number;
  }) {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;
    const where = options?.status ? { status: options.status } : {};

    const [items, total] = await Promise.all([
      prisma.bookingEnquiry.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
        include: {
          preferredRoomType: {
            select: { name: true, basePrice: true, slug: true },
          },
        },
      }),
      prisma.bookingEnquiry.count({ where }),
    ]);

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  /**
   * Retrieve single enquiry by ID
   */
  async getEnquiryById(id: string) {
    const enquiry = await prisma.bookingEnquiry.findUnique({
      where: { id },
      include: {
        preferredRoomType: true,
      },
    });

    if (!enquiry) {
      throw new NotFoundError(`Enquiry with ID '${id}' not found.`);
    }

    return enquiry;
  }

  /**
   * Update enquiry status and staff notes
   */
  async updateEnquiry(id: string, input: UpdateEnquiryInput) {
    const existing = await prisma.bookingEnquiry.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError(`Enquiry with ID '${id}' not found.`);
    }

    return prisma.bookingEnquiry.update({
      where: { id },
      data: {
        status: input.status ? (input.status as EnquiryStatus) : undefined,
        adminNotes: input.adminNotes !== undefined ? input.adminNotes : undefined,
      },
      include: {
        preferredRoomType: true,
      },
    });
  }
}

export const bookingService = new BookingService();
