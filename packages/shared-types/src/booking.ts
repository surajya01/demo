import { BookingStatus, BookingSource, HoldStatus, EnquiryStatus } from "@prisma/client";

export interface GuestDTO {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  city: string | null;
  state: string | null;
  country: string;
}

export interface BookingDTO {
  id: string;
  bookingReference: string;
  leadGuestId: string;
  leadGuest: GuestDTO;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: BookingStatus;
  source: BookingSource;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  priceSnapshot: Record<string, unknown>;
  policySnapshot: Record<string, unknown>;
  specialRequests: string | null;
  createdAt: string;
}

export interface BookingEnquiryDTO {
  id: string;
  guestName: string;
  phone: string;
  email: string | null;
  checkIn: string | null;
  checkOut: string | null;
  adults: number | null;
  children: number | null;
  preferredRoomTypeId: string | null;
  message: string | null;
  status: EnquiryStatus;
  adminNotes: string | null;
  createdAt: string;
}

export interface BookingHoldDTO {
  id: string;
  holdTokenHash: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  quantity: number;
  status: HoldStatus;
  expiresAt: string;
}
