import { prisma } from "../lib/prisma";
import { CreateServiceRequestInput } from "@apexify/validation";
import { qrService } from "./qr.service";
import { NotFoundError } from "../lib/errors";

export class ServiceRequestService {
  /**
   * Submit an in-room guest service request (housekeeping, towels, water, etc.)
   */
  async submitRequest(input: CreateServiceRequestInput) {
    const context = await qrService.resolveQRContext(input.qrToken);

    if (context.targetType !== "ROOM" || !context.roomId) {
      throw new NotFoundError("This service request is only available from a guest room QR code.");
    }

    return prisma.roomServiceRequest.create({
      data: {
        roomId: context.roomId,
        serviceTypeId: input.serviceTypeId,
        description: input.description || null,
        priority: input.priority || "NORMAL",
        status: "SUBMITTED",
      },
      include: {
        serviceType: true,
        room: true,
      },
    });
  }

  /**
   * Fetch configured service types
   */
  async getServiceTypes() {
    return prisma.serviceType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }
}

export const serviceRequestService = new ServiceRequestService();

