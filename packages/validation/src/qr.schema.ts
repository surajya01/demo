import { z } from "zod";

export const ValidateQRTokenSchema = z.object({
  token: z.string().min(16, "QR token must be at least 16 characters").max(128),
});

export type ValidateQRTokenInput = z.infer<typeof ValidateQRTokenSchema>;

export const CreateServiceRequestSchema = z.object({
  qrToken: z.string().min(16, "Valid room QR token required"),
  serviceTypeId: z.string().uuid("Invalid service type ID"),
  description: z.string().max(500, "Description max 500 characters").optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

export type CreateServiceRequestInput = z.infer<typeof CreateServiceRequestSchema>;

export const UpdateServiceRequestStatusSchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum(["SUBMITTED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "REJECTED"]),
  assignedStaffNotes: z.string().max(500).optional(),
});

export type UpdateServiceRequestStatusInput = z.infer<typeof UpdateServiceRequestStatusSchema>;
