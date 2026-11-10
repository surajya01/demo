import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/errors";

export class RestaurantService {
  /**
   * Retrieve active menu categories and available items for digital menu
   */
  async getPublicMenu(restaurantId?: string) {
    const restaurant = restaurantId
      ? await prisma.restaurant.findUnique({ where: { id: restaurantId } })
      : await prisma.restaurant.findFirst({ where: { isActive: true } });

    if (!restaurant) {
      throw new NotFoundError("Restaurant not found");
    }

    const categories = await prisma.menuCategory.findMany({
      where: {
        restaurantId: restaurant.id,
        isActive: true,
      },
      include: {
        menuItems: {
          where: { isAvailable: true },
          include: {
            variants: {
              where: { isAvailable: true },
            },
          },
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return {
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        openingTime: restaurant.openingTime,
        closingTime: restaurant.closingTime,
      },
      categories,
    };
  }

  /**
   * Get tables overview
   */
  async getTables(restaurantId?: string) {
    const restaurant = restaurantId
      ? await prisma.restaurant.findUnique({ where: { id: restaurantId } })
      : await prisma.restaurant.findFirst({ where: { isActive: true } });

    if (!restaurant) {
      throw new NotFoundError("Restaurant not found");
    }

    return prisma.restaurantTable.findMany({
      where: {
        restaurantId: restaurant.id,
        isActive: true,
      },
      orderBy: { tableNumber: "asc" },
    });
  }
}

export const restaurantService = new RestaurantService();

