/**
 * Dhuri Resort - Development Database Seed Script
 * Developed by Apexify
 * 
 * DISCLAIMER:
 * ALL DATA IN THIS SCRIPT IS EXCLUSIVELY FOR LOCAL/DEVELOPMENT TESTING.
 * NO PRODUCTION OR UNVERIFIED PRICING/INVENTORY SHOULD BE COMMITTED TO LIVE DEPLOYMENTS.
 */

import fs from "fs";
import path from "path";

// Load .env if not loaded by parent process
function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadLocalEnv();

import { PrismaClient, RoomOperationalStatus, TableStatus, DietaryType, ServicePriority, DiscountType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Dhuri Resort Development Seed...");

  // 1. Clean existing records in reverse dependency order (DEV ONLY)
  console.log("Cleaning old development data...");
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.roomServiceRequest.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.tableSession.deleteMany();
  await prisma.qRAssignment.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.menuItemVariant.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.serviceType.deleteMany();
  await prisma.bookingRoom.deleteMany();
  await prisma.bookingHold.deleteMany();
  await prisma.bookingEnquiry.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.roomInventory.deleteMany();
  await prisma.roomRate.deleteMany();
  await prisma.ratePlan.deleteMany();
  await prisma.roomImage.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.websiteSection.deleteMany();
  await prisma.websitePage.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.offer.deleteMany();

  // 2. Seed Room Types
  console.log("Seeding Room Types...");
  const deluxeType = await prisma.roomType.create({
    data: {
      name: "Deluxe Double Room",
      slug: "deluxe-double-room",
      description: "Comfortable air-conditioned room featuring double bed, ensuite bathroom, flat-screen TV, desk, and pool/garden view.",
      shortDescription: "Double bed, ensuite bathroom, pool view, AC.",
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      basePrice: 3200.00,
      sizeSqFt: 280,
      bedConfiguration: "1 Double Bed",
      amenities: ["Air Conditioning", "Private Bathroom", "Flat-screen TV", "Free WiFi", "Desk", "Wake-up Service"],
      isPublished: true,
      sortOrder: 1,
      images: {
        create: [
          {
            storagePath: "/images/resort/room_deluxe_double.jpg",
            altText: "Dhuri Resort Deluxe Double Room Interior",
            isCover: true,
            sortOrder: 0,
          },
          {
            storagePath: "/images/resort/bathroom_modern.jpg",
            altText: "Deluxe Room Modern Bathroom",
            isCover: false,
            sortOrder: 1,
          },
        ],
      },
    },
  });

  const executiveType = await prisma.roomType.create({
    data: {
      name: "Executive Double Room",
      slug: "executive-double-room",
      description: "Spacious executive room with premium furnishings, private balcony area, work desk, and upgraded bathroom amenities.",
      shortDescription: "Spacious executive room, premium furnishings, balcony view.",
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      basePrice: 4200.00,
      sizeSqFt: 350,
      bedConfiguration: "1 King Bed or 1 Double Bed",
      amenities: ["Air Conditioning", "Balcony", "Private Bathroom", "Electric Kettle", "Minibar", "Free WiFi"],
      isPublished: true,
      sortOrder: 2,
      images: {
        create: [
          {
            storagePath: "/images/placeholders/room_placeholder.svg",
            altText: "Executive Double Room Placeholder (Awaiting Management Photo)",
            isCover: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const standardType = await prisma.roomType.create({
    data: {
      name: "Standard Double Room with Fan",
      slug: "standard-double-room-fan",
      description: "Economical double room with ceiling fan, extra-large double bed, private bathroom, and direct garden access.",
      shortDescription: "Ceiling fan, extra-large double bed, garden access.",
      maxAdults: 2,
      maxChildren: 2,
      maxOccupancy: 4,
      basePrice: 2200.00,
      sizeSqFt: 240,
      bedConfiguration: "1 Extra-Large Double Bed",
      amenities: ["Ceiling Fan", "Private Bathroom", "Shower", "Tile/Marble Floor", "Free WiFi"],
      isPublished: true,
      sortOrder: 3,
      images: {
        create: [
          {
            storagePath: "/images/placeholders/room_placeholder.svg",
            altText: "Standard Double Room with Fan Placeholder",
            isCover: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // 3. Seed Physical Rooms
  console.log("Seeding Rooms...");
  await prisma.room.createMany({
    data: [
      { roomTypeId: deluxeType.id, roomNumber: "101", floorLabel: "Ground Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: deluxeType.id, roomNumber: "102", floorLabel: "Ground Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: deluxeType.id, roomNumber: "103", floorLabel: "Ground Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: executiveType.id, roomNumber: "201", floorLabel: "First Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: executiveType.id, roomNumber: "202", floorLabel: "First Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: standardType.id, roomNumber: "301", floorLabel: "Second Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
      { roomTypeId: standardType.id, roomNumber: "302", floorLabel: "Second Floor", operationalStatus: RoomOperationalStatus.ACTIVE, isBookable: true },
    ],
  });

  // 4. Seed Rate Plans & Room Rates
  console.log("Seeding Rate Plans & Rates...");
  const roomOnlyPlan = await prisma.ratePlan.create({
    data: {
      name: "Room Only (EP)",
      code: "EP",
      description: "European Plan — accommodation only, meals charged separately.",
      mealPlan: "None",
      cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
      isActive: true,
    },
  });

  const breakfastPlan = await prisma.ratePlan.create({
    data: {
      name: "Bed & Breakfast (CP)",
      code: "CP",
      description: "Continental Plan — includes daily breakfast for registered guests.",
      mealPlan: "Breakfast Included",
      cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
      isActive: true,
    },
  });

  const today = new Date();
  const validFrom = new Date(today.getFullYear(), today.getMonth(), 1);
  const validTo = new Date(today.getFullYear() + 1, 11, 31);

  await prisma.roomRate.createMany({
    data: [
      { roomTypeId: deluxeType.id, ratePlanId: roomOnlyPlan.id, validFrom, validTo, baseAmount: 3200.00, currency: "INR" },
      { roomTypeId: deluxeType.id, ratePlanId: breakfastPlan.id, validFrom, validTo, baseAmount: 3700.00, currency: "INR" },
      { roomTypeId: executiveType.id, ratePlanId: roomOnlyPlan.id, validFrom, validTo, baseAmount: 4200.00, currency: "INR" },
      { roomTypeId: executiveType.id, ratePlanId: breakfastPlan.id, validFrom, validTo, baseAmount: 4800.00, currency: "INR" },
      { roomTypeId: standardType.id, ratePlanId: roomOnlyPlan.id, validFrom, validTo, baseAmount: 2200.00, currency: "INR" },
      { roomTypeId: standardType.id, ratePlanId: breakfastPlan.id, validFrom, validTo, baseAmount: 2700.00, currency: "INR" },
    ],
  });

  // 5. Seed Inventory for next 14 days
  console.log("Seeding Initial Room Inventory (14 days)...");
  const inventoryRows = [];
  for (let i = 0; i < 14; i++) {
    const stayDate = new Date(today);
    stayDate.setDate(today.getDate() + i);
    stayDate.setHours(0, 0, 0, 0);

    inventoryRows.push(
      { roomTypeId: deluxeType.id, stayDate, totalUnits: 3, bookedUnits: 0, blockedUnits: 0 },
      { roomTypeId: executiveType.id, stayDate, totalUnits: 2, bookedUnits: 0, blockedUnits: 0 },
      { roomTypeId: standardType.id, stayDate, totalUnits: 2, bookedUnits: 0, blockedUnits: 0 }
    );
  }
  await prisma.roomInventory.createMany({ data: inventoryRows });

  // 6. Seed Restaurant & Tables
  console.log("Seeding Restaurant, Categories, Items & Tables...");
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Dhuri Family Restaurant & Bar",
      description: "Multi-cuisine dining offering authentic Indian, Chinese, Tandoori, and local specialties alongside refreshing cocktails.",
      openingTime: "07:30",
      closingTime: "23:00",
      isActive: true,
      menuCategories: {
        create: [
          {
            name: "Tandoor & Starters",
            slug: "tandoor-starters",
            description: "Freshly skewered kebabs and tandoori delicacies.",
            sortOrder: 1,
            isActive: true,
            menuItems: {
              create: [
                {
                  name: "Dhuri Special Tandoori Platter",
                  description: "Assorted tandoori kebabs served with mint chutney and fresh onion salad.",
                  price: 550.00,
                  dietaryType: DietaryType.NON_VEGETARIAN,
                  isAvailable: true,
                  preparationMinutes: 25,
                  sortOrder: 1,
                },
                {
                  name: "Paneer Tikka Sunhari",
                  description: "Marinated cottage cheese cubes grilled to golden perfection in clay oven.",
                  price: 340.00,
                  dietaryType: DietaryType.VEGETARIAN,
                  isAvailable: true,
                  preparationMinutes: 20,
                  sortOrder: 2,
                },
              ],
            },
          },
          {
            name: "Main Course",
            slug: "main-course",
            description: "Hearty curries and Indian specialties.",
            sortOrder: 2,
            isActive: true,
            menuItems: {
              create: [
                {
                  name: "Butter Chicken",
                  description: "Boneless chicken simmered in a velvety tomato and cashew nut gravy.",
                  price: 420.00,
                  dietaryType: DietaryType.NON_VEGETARIAN,
                  isAvailable: true,
                  preparationMinutes: 25,
                  sortOrder: 1,
                },
                {
                  name: "Dum Handi Veg Biryani",
                  description: "Aromatic basmati rice cooked with fresh seasonal vegetables, saffron, and spices.",
                  price: 290.00,
                  dietaryType: DietaryType.VEGETARIAN,
                  isAvailable: true,
                  preparationMinutes: 20,
                  sortOrder: 2,
                },
              ],
            },
          },
          {
            name: "Beverages & Refreshers",
            slug: "beverages",
            description: "Mocktails, fresh juices, and cooler drinks.",
            sortOrder: 3,
            isActive: true,
            menuItems: {
              create: [
                {
                  name: "Fresh Lime Soda",
                  description: "Sweet, salted, or mixed fresh lime cooler.",
                  price: 80.00,
                  dietaryType: DietaryType.VEGETARIAN,
                  isAvailable: true,
                  preparationMinutes: 5,
                  sortOrder: 1,
                },
              ],
            },
          },
        ],
      },
      tables: {
        create: [
          { tableNumber: "T-01", sectionLabel: "Indoor AC Dining", capacity: 4, status: TableStatus.AVAILABLE },
          { tableNumber: "T-02", sectionLabel: "Indoor AC Dining", capacity: 4, status: TableStatus.AVAILABLE },
          { tableNumber: "T-03", sectionLabel: "Indoor AC Dining", capacity: 6, status: TableStatus.AVAILABLE },
          { tableNumber: "Pool-01", sectionLabel: "Poolside Deck", capacity: 4, status: TableStatus.AVAILABLE },
          { tableNumber: "Pool-02", sectionLabel: "Poolside Deck", capacity: 6, status: TableStatus.AVAILABLE },
        ],
      },
    },
  });

  // 7. Seed Service Types for Room QR
  console.log("Seeding Service Types...");
  await prisma.serviceType.createMany({
    data: [
      { name: "Housekeeping & Room Cleaning", code: "HOUSEKEEPING", defaultPriority: ServicePriority.NORMAL, isActive: true },
      { name: "Fresh Towels & Linens", code: "TOWELS", defaultPriority: ServicePriority.NORMAL, isActive: true },
      { name: "Drinking Water (Bottled)", code: "WATER", defaultPriority: ServicePriority.HIGH, isActive: true },
      { name: "Maintenance & Electrical Support", code: "MAINTENANCE", defaultPriority: ServicePriority.HIGH, isActive: true },
      { name: "Front Desk Assistance", code: "RECEPTION", defaultPriority: ServicePriority.NORMAL, isActive: true },
      { name: "Luggage Assistance", code: "BELL_DESK", defaultPriority: ServicePriority.NORMAL, isActive: true },
    ],
  });

  // 8. Seed Offers
  console.log("Seeding Offers...");
  await prisma.offer.createMany({
    data: [
      {
        title: "Monsoon Weekend Getaway",
        code: "MONSOON15",
        description: "15% off room bookings for weekend stays during the rainy season.",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 15.00,
        minBookingAmount: 3000.00,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        title: "Early Bird Advance Reservation",
        code: "EARLYBIRD",
        description: "Book 14 days in advance to enjoy ₹500 flat discount.",
        discountType: DiscountType.FLAT_AMOUNT,
        discountValue: 500.00,
        minBookingAmount: 4000.00,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
  });

  // 9. Seed Sample Guest Enquiry (Development Only)
  console.log("Seeding Sample Development Enquiry...");
  await prisma.bookingEnquiry.create({
    data: {
      guestName: "Rohan Sharma (Dev Sample)",
      phone: "+91 98765 43210",
      email: "rohan.sharma.sample@example.com",
      checkIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      adults: 2,
      children: 1,
      preferredRoomTypeId: deluxeType.id,
      message: "Looking for a poolside room for a family weekend break.",
      status: "PENDING",
      adminNotes: "Sample development test enquiry - no action needed.",
    },
  });

  console.log("✅ Dhuri Resort Development Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
