import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/errors";

export class RoomService {
  /**
   * Retrieve all published room types with their cover images and details
   */
  async getPublishedRoomTypes() {
    return prisma.roomType.findMany({
      where: { isPublished: true },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  }

  /**
   * Retrieve single room type by slug
   */
  async getRoomTypeBySlug(slug: string) {
    const roomType = await prisma.roomType.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        rates: { where: { isActive: true } },
      },
    });

    if (!roomType) {
      throw new NotFoundError(`Room type with slug '${slug}' not found`);
    }

    return roomType;
  }

  /**
   * Check room availability for date range without overselling
   */
  async checkAvailability(roomTypeId: string, checkIn: Date, checkOut: Date, requestedUnits: number = 1) {
    const roomType = await prisma.roomType.findUnique({
      where: { id: roomTypeId },
      include: {
        rooms: {
          where: {
            operationalStatus: "ACTIVE",
            isBookable: true,
          },
        },
      },
    });

    if (!roomType) {
      throw new NotFoundError("Room type not found");
    }

    const totalActivePhysicalRooms = roomType.rooms.length;

    // Retrieve recorded inventory for this date range
    const inventoryRecords = await prisma.roomInventory.findMany({
      where: {
        roomTypeId,
        stayDate: {
          gte: checkIn,
          lt: checkOut,
        },
      },
    });

    // Verify each day in the date range
    const currentDate = new Date(checkIn);
    while (currentDate < checkOut) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const dayRecord = inventoryRecords.find(
        (r) => r.stayDate.toISOString().split("T")[0] === dateStr
      );

      const totalUnits = dayRecord ? dayRecord.totalUnits : totalActivePhysicalRooms;
      const bookedUnits = dayRecord ? dayRecord.bookedUnits : 0;
      const blockedUnits = dayRecord ? dayRecord.blockedUnits : 0;
      const availableUnits = totalUnits - bookedUnits - blockedUnits;

      if (availableUnits < requestedUnits) {
        return {
          isAvailable: false,
          dateBlocked: dateStr,
          availableUnits,
          requestedUnits,
        };
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      isAvailable: true,
      roomTypeId,
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
    };
  }
}

export const roomService = new RoomService();

