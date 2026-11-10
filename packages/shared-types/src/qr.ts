import { QRTargetType, QRStatus, ServiceRequestStatus, ServicePriority } from "@prisma/client";

export interface QRAssignmentDTO {
  id: string;
  tokenHash: string;
  targetType: QRTargetType;
  tableId: string | null;
  roomId: string | null;
  status: QRStatus;
  expiresAt: string | null;
  revokedAt: string | null;
}

export interface QRContextDTO {
  tokenValid: boolean;
  targetType: QRTargetType;
  targetLabel: string;
  tableId?: string;
  roomId?: string;
  roomNumber?: string;
  tableNumber?: string;
  restaurantName?: string;
  allowedFeatures: {
    canOrderFood: boolean;
    canRequestService: boolean;
    canViewBill: boolean;
  };
}

export interface ServiceTypeDTO {
  id: string;
  name: string;
  code: string;
  description: string | null;
  defaultPriority: ServicePriority;
  isActive: boolean;
}

export interface RoomServiceRequestDTO {
  id: string;
  roomId: string;
  roomNumber?: string;
  bookingId: string | null;
  serviceTypeId: string;
  serviceTypeName?: string;
  description: string | null;
  status: ServiceRequestStatus;
  priority: ServicePriority;
  assignedStaffNotes: string | null;
  completedAt: string | null;
  createdAt: string;
}
