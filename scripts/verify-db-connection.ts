/**
 * Apexify Resort - Database Connection & Health Verification Script
 * Developed by Apexify
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

import { PrismaClient } from "@prisma/client";

async function verifyDatabase() {
  console.log("==================================================================");
  console.log(" Apexify Resort — Database Connection Verification (MySQL 8.0+)");
  console.log(" Technology Partner: Apexify");
  console.log("==================================================================");

  const rawUrl = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/apexify_resort";
  const maskedUrl = rawUrl.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:******@");
  console.log(`Configured DATABASE_URL: ${maskedUrl}`);

  const prisma = new PrismaClient({
    log: ["error"],
  });

  try {
    console.log("Attempting handshake with MySQL server...");
    const result: unknown = await prisma.$queryRaw`SELECT 1 as is_alive, NOW() as server_time, VERSION() as mysql_version`;
    console.log("✅ MySQL Server Connection SUCCESSFUL!");
    console.log("Server Response:", result);

    const [roomTypeCount, roomCount, restaurantCount, tableCount, enquiryCount] = await Promise.all([
      prisma.roomType.count(),
      prisma.room.count(),
      prisma.restaurant.count(),
      prisma.restaurantTable.count(),
      prisma.bookingEnquiry.count(),
    ]);

    console.log("\n📊 Current Database Schema Stats:");
    console.log(` - Room Types:       ${roomTypeCount}`);
    console.log(` - Physical Rooms:   ${roomCount}`);
    console.log(` - Restaurants:      ${restaurantCount}`);
    console.log(` - Tables:           ${tableCount}`);
    console.log(` - Enquiries:        ${enquiryCount}`);

    console.log("\nDatabase is fully initialized and operational.");
    process.exit(0);
  } catch (error: unknown) {
    console.warn("\n⚠️ MySQL connection could not be established with the current credentials.");
    const err = error as Error;
    console.warn("Reason:", err.message);

    console.log("\n------------------------------------------------------------------");
    console.log("📋 INSTRUCTIONS FOR LOCAL MYSQL SETUP:");
    console.log("1. Ensure MySQL 8.0+ server is running on localhost:3306.");
    console.log("2. Create the database:");
    console.log("     mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS apexify_resort;'");
    console.log("3. Update .env with your local credentials:");
    console.log('     DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/apexify_resort"');
    console.log("4. Apply migrations and seed data:");
    console.log("     npm run prisma:push   (or: npx prisma migrate deploy)");
    console.log("     npm run prisma:seed");
    console.log("------------------------------------------------------------------");
    process.exit(0);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
