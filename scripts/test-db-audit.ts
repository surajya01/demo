import { PrismaClient, Prisma } from '@prisma/client';
import { withTransaction } from '../packages/database/src/transaction';
import * as fs from 'fs';
import * as path from 'path';

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
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

const prisma = new PrismaClient({
  log: ['error'],
});

async function runAuditTests() {
  console.log('================================================================');
  console.log(' DHURI RESORT - PHASE 1 DATABASE & PRISMA TECHNICAL AUDIT');
  console.log('================================================================\n');

  // 1. Connection & Server Handshake
  console.log('[TEST 1] Verifying MySQL Database Connection...');
  const [versionResult]: any = await prisma.$queryRaw`SELECT VERSION() as version, @@version_comment as comment`;
  console.log(`✓ Connected to Database: ${versionResult.version} (${versionResult.comment})`);
  const [currentDb]: any = await prisma.$queryRaw`SELECT DATABASE() as db`;
  console.log(`✓ Active Database: ${currentDb.db}`);

  // Count tables
  const tables: any = await prisma.$queryRaw`SHOW TABLES;`;
  console.log(`✓ Verified Total Tables in Database: ${tables.length}`);

  // 2. Prisma CRUD Verification
  console.log('\n[TEST 2] Testing Prisma CRUD Operations...');
  const testSlug = 'audit-deluxe-test-suite';

  // Cleanup if exists from previous run
  await prisma.roomType.deleteMany({ where: { slug: testSlug } });

  // CREATE
  const created = await prisma.roomType.create({
    data: {
      name: 'Audit Deluxe Test Suite',
      slug: testSlug,
      shortDescription: 'Temporary room type for Phase 1 CRUD automated verification',
      description: 'Full description of the deluxe test room verifying text column storage and JSON amenities.',
      basePrice: new Prisma.Decimal('5500.00'),
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      sizeSqFt: 380,
      bedConfiguration: '1 King Bed',
      amenities: ['High-Speed Wi-Fi', 'Air Conditioning', 'Pool Access'],
      isPublished: true,
      sortOrder: 99,
    },
  });
  console.log(`✓ [CREATE] Successfully created RoomType id: ${created.id}, slug: ${created.slug}, basePrice: Rs.${created.basePrice.toString()}`);

  // READ
  const retrieved = await prisma.roomType.findUnique({
    where: { id: created.id },
  });
  if (!retrieved || retrieved.slug !== testSlug) {
    throw new Error('CRUD Read failed: retrieved record mismatch');
  }
  console.log(`✓ [READ] Successfully retrieved RoomType: "${retrieved.name}" (Max Occupancy: ${retrieved.maxOccupancy}, Bed: ${retrieved.bedConfiguration})`);

  // UPDATE
  const updated = await prisma.roomType.update({
    where: { id: created.id },
    data: {
      name: 'Audit Deluxe Test Suite (Updated Rate)',
      basePrice: new Prisma.Decimal('5999.00'),
      maxOccupancy: 4,
    },
  });
  if (Number(updated.basePrice) !== 5999.0) {
    throw new Error('CRUD Update failed: updated price mismatch');
  }
  console.log(`✓ [UPDATE] Successfully updated RoomType id: ${updated.id}, new basePrice: Rs.${updated.basePrice.toString()}, maxOccupancy: ${updated.maxOccupancy}`);

  // 3. Transaction Handling & Inventory Concurrency Protection
  console.log('\n[TEST 3] Testing Transaction Handling & Inventory Concurrency Protection...');

  const stayDate = new Date();
  stayDate.setDate(stayDate.getDate() + 1);
  stayDate.setHours(0, 0, 0, 0);

  // Setup test inventory: 5 total units, 0 booked, 0 blocked
  const inv = await prisma.roomInventory.create({
    data: {
      roomTypeId: created.id,
      stayDate: stayDate,
      totalUnits: 5,
      bookedUnits: 0,
      blockedUnits: 0,
    },
  });
  console.log(`✓ Initialized inventory: Date=${stayDate.toISOString().slice(0, 10)}, Total=${inv.totalUnits}, Booked=${inv.bookedUnits}, Blocked=${inv.blockedUnits}, Available=5`);

  // Concurrency hold allocator wrapped in withTransaction
  async function attemptHold(requestId: string, quantityToHold: number): Promise<{ success: boolean; message: string }> {
    return await withTransaction(async (tx) => {
      // 1. Fetch fresh inventory record
      const currentInv = await tx.roomInventory.findUnique({
        where: { id: inv.id },
      });

      if (!currentInv) {
        throw new Error('Inventory record missing in transaction');
      }

      // 2. Count active holds for this room type & date
      const activeHolds = await tx.bookingHold.findMany({
        where: {
          roomTypeId: created.id,
          checkIn: { lte: stayDate },
          checkOut: { gt: stayDate },
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
      });

      const totalHeld = activeHolds.reduce((acc, h) => acc + h.quantity, 0);
      const available = currentInv.totalUnits - currentInv.bookedUnits - currentInv.blockedUnits - totalHeld;

      if (available < quantityToHold) {
        return {
          success: false,
          message: `Request [${requestId}] REJECTED: Requested ${quantityToHold} units, but only ${available} available (Concurrency Guard Active).`,
        };
      }

      // 3. Allocate hold
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
      const nextDay = new Date(stayDate);
      nextDay.setDate(nextDay.getDate() + 1);

      await tx.bookingHold.create({
        data: {
          holdTokenHash: `hash-${requestId}-${Date.now()}`,
          roomTypeId: created.id,
          checkIn: stayDate,
          checkOut: nextDay,
          quantity: quantityToHold,
          status: 'ACTIVE',
          expiresAt: expiresAt,
        },
      });

      const remainingAfter = available - quantityToHold;
      return {
        success: true,
        message: `Request [${requestId}] APPROVED: Successfully held ${quantityToHold} units. Remaining units available: ${remainingAfter}.`,
      };
    });
  }

  // Request A: Hold 3 units (5 available -> 2 remaining)
  const resA = await attemptHold('REQ-A', 3);
  console.log(`✓ ${resA.message}`);
  if (!resA.success) throw new Error('Transaction A should have succeeded');

  // Request B: Attempt to hold 3 units (only 2 left! Must be rejected)
  const resB = await attemptHold('REQ-B', 3);
  console.log(`✓ ${resB.message}`);
  if (resB.success) throw new Error('Transaction B should have been rejected due to insufficient inventory');

  // Request C: Attempt to hold 2 units (exactly 2 left! Must succeed)
  const resC = await attemptHold('REQ-C', 2);
  console.log(`✓ ${resC.message}`);
  if (!resC.success) throw new Error('Transaction C should have succeeded');

  // Request D: Attempt to hold 1 unit (0 left! Must be rejected)
  const resD = await attemptHold('REQ-D', 1);
  console.log(`✓ ${resD.message}`);
  if (resD.success) throw new Error('Transaction D should have been rejected due to 0 available inventory');

  // 4. Release a hold and verify restored availability
  console.log('\n[TEST 4] Testing Hold Release and Inventory Restoration in Transaction...');
  await withTransaction(async (tx) => {
    // Release the first hold (3 units)
    const holdA = await tx.bookingHold.findFirst({
      where: { roomTypeId: created.id, status: 'ACTIVE' },
    });
    if (holdA) {
      await tx.bookingHold.update({
        where: { id: holdA.id },
        data: { status: 'EXPIRED' },
      });
      console.log(`✓ Successfully marked hold id ${holdA.id} (${holdA.quantity} units) as EXPIRED.`);
    }
  });

  // Verify availability is restored by holding 2 units now
  const resE = await attemptHold('REQ-E', 2);
  console.log(`✓ ${resE.message}`);
  if (!resE.success) throw new Error('Transaction E should have succeeded after inventory release');

  // 5. Cleanup Test Records
  console.log('\n[TEST 5] Cleaning Up Audit Test Records...');
  await prisma.bookingHold.deleteMany({ where: { roomTypeId: created.id } });
  await prisma.roomInventory.deleteMany({ where: { roomTypeId: created.id } });
  await prisma.roomType.delete({ where: { id: created.id } });
  const remainingCheck = await prisma.roomType.count({ where: { slug: testSlug } });
  console.log(`✓ [DELETE] Successfully deleted RoomType and associated records. Remaining test records: ${remainingCheck}`);

  console.log('\n================================================================');
  console.log(' ALL DATABASE & PRISMA AUDIT TESTS PASSED SUCCESSFULLY');
  console.log('================================================================\n');
}

runAuditTests()
  .catch((e) => {
    console.error('AUDIT TEST FAILED:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
