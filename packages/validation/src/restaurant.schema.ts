import { z } from "zod";

export const CartItemSchema = z.object({
  menuItemId: z.string().uuid("Invalid menu item ID"),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(50),
  specialInstructions: z.string().max(200).optional(),
});

export const CreateRestaurantOrderSchema = z.object({
  qrToken: z.string().min(16, "Valid QR token required"),
  orderType: z.enum(["DINE_IN", "ROOM_SERVICE", "TAKEAWAY"]).default("DINE_IN"),
  items: z.array(CartItemSchema).min(1, "At least one item required to place an order"),
  guestIdentifier: z.string().max(100).optional(),
  specialInstructions: z.string().max(500).optional(),
});

export type CreateRestaurantOrderInput = z.infer<typeof CreateRestaurantOrderSchema>;

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum([
    "PLACED",
    "ACCEPTED",
    "REJECTED",
    "PREPARING",
    "READY",
    "SERVED",
    "COMPLETED",
    "CANCELLED",
  ]),
  notes: z.string().max(500).optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
