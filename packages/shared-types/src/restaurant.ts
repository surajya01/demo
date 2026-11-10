import {
  DietaryType,
  RestaurantOrderStatus,
  OrderType,
  TableStatus,
  TableSessionStatus,
} from "@prisma/client";

export interface MenuCategoryDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  itemCount?: number;
}

export interface MenuItemVariantDTO {
  id: string;
  menuItemId: string;
  name: string;
  priceDelta: number;
  isAvailable: boolean;
}

export interface MenuItemDTO {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  imagePath: string | null;
  price: number;
  currency: string;
  dietaryType: DietaryType;
  isAvailable: boolean;
  preparationMinutes: number | null;
  sortOrder: number;
  variants: MenuItemVariantDTO[];
}

export interface RestaurantTableDTO {
  id: string;
  restaurantId: string;
  tableNumber: string;
  sectionLabel: string | null;
  capacity: number;
  status: TableStatus;
  isActive: boolean;
}

export interface TableSessionDTO {
  id: string;
  tableId: string;
  qrAssignmentId: string | null;
  openedAt: string;
  closedAt: string | null;
  status: TableSessionStatus;
  notes: string | null;
}

export interface OrderItemDTO {
  id: string;
  menuItemId: string | null;
  itemNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  variantSnapshot: Record<string, unknown> | null;
  lineTotal: number;
  notes: string | null;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  tableSessionId: string | null;
  bookingId: string | null;
  roomId: string | null;
  orderType: OrderType;
  status: RestaurantOrderStatus;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  specialInstructions: string | null;
  items: OrderItemDTO[];
  createdAt: string;
}
