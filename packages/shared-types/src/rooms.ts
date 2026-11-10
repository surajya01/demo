import { RoomOperationalStatus } from "@prisma/client";

export interface RoomTypeDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
  basePrice: number;
  sizeSqFt: number | null;
  bedConfiguration: string | null;
  amenities: string[];
  isPublished: boolean;
  sortOrder: number;
  images: RoomImageDTO[];
}

export interface RoomImageDTO {
  id: string;
  storagePath: string;
  altText: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface RoomDTO {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floorLabel: string | null;
  operationalStatus: RoomOperationalStatus;
  isBookable: boolean;
  notes: string | null;
}

export interface RatePlanDTO {
  id: string;
  name: string;
  code: string;
  description: string | null;
  mealPlan: string | null;
  cancellationPolicy: string | null;
  isActive: boolean;
}

export interface InventoryCheckResult {
  roomTypeId: string;
  stayDate: string;
  availableUnits: number;
  isAvailable: boolean;
}
