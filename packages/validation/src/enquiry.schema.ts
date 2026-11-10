import { z } from "zod";

export const CreateEnquirySchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^[0-9+ -]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  adults: z.coerce.number().int().min(1).max(20).optional().default(2),
  children: z.coerce.number().int().min(0).max(10).optional().default(0),
  preferredRoomTypeId: z.string().uuid().optional().or(z.literal("")),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
});

export type CreateEnquiryInput = z.infer<typeof CreateEnquirySchema>;

export const UpdateEnquirySchema = z.object({
  status: z.enum(["PENDING", "CONTACTED", "CONVERTED", "ARCHIVED"]).optional(),
  adminNotes: z.string().max(1000).optional(),
});

export type UpdateEnquiryInput = z.infer<typeof UpdateEnquirySchema>;
