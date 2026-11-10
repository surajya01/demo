import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/errors";

export class QRService {
  /**
   * Hashes a raw QR token string with SHA-256 for secure lookup.
   * Protects against raw token exposure in database logs.
   */
  hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  /**
   * Validate token and resolve context without leaking sensitive guest data in URL.
   */
  async resolveQRContext(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);

    const assignment = await prisma.qRAssignment.findUnique({
      where: { tokenHash },
      include: {
        table: {
          select: { id: true, tableNumber: true, sectionLabel: true, restaurantId: true },
        },
        room: {
          select: { id: true, roomNumber: true, floorLabel: true },
        },
      },
    });

    if (!assignment || assignment.status !== "ACTIVE") {
      throw new NotFoundError("QR code is inactive, invalid, or has been revoked.");
    }

    if (assignment.targetType === "TABLE" && assignment.table) {
      return {
        targetType: "TABLE" as const,
        tableId: assignment.table.id,
        tableNumber: assignment.table.tableNumber,
        section: assignment.table.sectionLabel,
        canOrderFood: true,
        canRequestService: false,
      };
    }

    if (assignment.targetType === "ROOM" && assignment.room) {
      return {
        targetType: "ROOM" as const,
        roomId: assignment.room.id,
        roomNumber: assignment.room.roomNumber,
        floor: assignment.room.floorLabel,
        canOrderFood: true,
        canRequestService: true,
      };
    }

    throw new NotFoundError("Invalid QR target mapping.");
  }
}

export const qrService = new QRService();

