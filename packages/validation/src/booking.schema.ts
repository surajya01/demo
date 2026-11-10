import { z } from "zod";

export const AvailabilitySearchSchema = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Check-in must be YYYY-MM-DD"),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Check-out must be YYYY-MM-DD"),
    adults: z.coerce.number().int().min(1, "At least 1 adult required").max(10, "Max 10 adults"),
    children: z.coerce.number().int().min(0, "Children cannot be negative").max(10, "Max 10 children").default(0),
    rooms: z.coerce.number().int().min(1, "At least 1 room required").max(5, "Max 5 rooms").default(1),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export type AvailabilitySearchInput = z.infer<typeof AvailabilitySearchSchema>;

export const CreateBookingHoldSchema = z
  .object({
    roomTypeId: z.string().uuid("Invalid room type ID"),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    quantity: z.number().int().min(1).max(5).default(1),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export type CreateBookingHoldInput = z.infer<typeof CreateBookingHoldSchema>;

export const LeadGuestSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^[0-9+ -]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().max(20).optional(),
  country: z.string().max(100).default("India"),
});

export const CreateBookingSchema = z.object({
  holdToken: z.string().min(16, "Valid hold token required"),
  guest: LeadGuestSchema,
  specialRequests: z.string().max(500).optional(),
  paymentMethod: z.enum([
    "ONLINE_UPI",
    "ONLINE_CARD",
    "ONLINE_NETBANKING",
    "PAY_AT_PROPERTY",
    "CASH",
  ]).default("ONLINE_UPI"),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
