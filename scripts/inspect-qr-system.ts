import * as fs from "fs";
import * as path from "path";

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function inspect() {
  const restaurant = await prisma.restaurant.findFirst({
    include: {
      menuCategories: {
        include: { menuItems: true },
      },
      tables: true,
    },
  });

  const qrs = await prisma.qRAssignment.findMany({
    include: { table: true, room: true },
  });

  const serviceTypes = await prisma.serviceType.findMany();
  const rooms = await prisma.room.findMany();

  console.log("=== QR & RESTAURANT INVENTORY ===");
  console.log("Restaurant:", restaurant?.name);
  console.log("Categories Count:", restaurant?.menuCategories.length);
  restaurant?.menuCategories.forEach((c) => {
    console.log(`  - ${c.name} (${c.menuItems.length} items)`);
  });
  console.log("Tables Count:", restaurant?.tables.length);
  restaurant?.tables.forEach((t) => {
    console.log(`  - Table ${t.tableNumber} (Capacity: ${t.capacity}, Status: ${t.status})`);
  });
  console.log("Total Rooms:", rooms.length);
  console.log("Service Types:", serviceTypes.map((s) => s.name).join(", "));
  console.log("Existing QR Assignments Count:", qrs.length);

  await prisma.$disconnect();
}

inspect();

