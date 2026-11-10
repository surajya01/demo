import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("=== INSPECTING CURRENT SEEDED DATA ===");
  const roomTypes = await prisma.roomType.findMany({
    include: {
      rooms: true,
      rates: { include: { ratePlan: true } },
    },
  });

  console.log(`Found ${roomTypes.length} Room Types:`);
  for (const rt of roomTypes) {
    console.log(`- [${rt.id}] slug: "${rt.slug}", name: "${rt.name}", basePrice: ${rt.basePrice}, physical rooms: ${rt.rooms.length}`);
    for (const r of rt.rooms) {
      console.log(`    Room #${r.roomNumber} (${r.operationalStatus}, bookable: ${r.isBookable})`);
    }
    for (const rate of rt.rates) {
      console.log(`    RatePlan "${rate.ratePlan.code}": baseAmount: ${rate.baseAmount}`);
    }
  }

  const inventories = await prisma.roomInventory.findMany({
    take: 10,
    orderBy: { stayDate: "asc" },
  });
  console.log(`\nSample Room Inventory rows (${inventories.length} shown):`);
  for (const inv of inventories) {
    console.log(`- StayDate: ${inv.stayDate.toISOString().slice(0, 10)}, RoomTypeId: ${inv.roomTypeId}, Total: ${inv.totalUnits}, Booked: ${inv.bookedUnits}, Blocked: ${inv.blockedUnits}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

