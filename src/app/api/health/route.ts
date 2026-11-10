import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();
  
  let dbStatus = "DISCONNECTED";
  let dbError = null;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "CONNECTED";
  } catch (err: unknown) {
    dbStatus = "DISCONNECTED";
    dbError = (err as Error).message;
  }

  return NextResponse.json({
    status: "OK",
    phase: "PHASE_1_FOUNDATION",
    project: "Apexify Resort Digital Hospitality Platform",
    technologyPartner: "Apexify",
    timestamp,
    database: {
      engine: "MySQL 8.0+",
      orm: "Prisma ORM 5.22.0",
      status: dbStatus,
      connectionNote: dbStatus === "CONNECTED" 
        ? "MySQL active and responding" 
        : "Run local MySQL server on port 3306 and execute npm run prisma:push",
      error: dbError,
    },
    architecture: {
      framework: "Next.js 14 (App Router)",
      language: "TypeScript (Strict)",
      styling: "Tailwind CSS v3.4 + Brand Theme Tokens",
      authStatus: "NOT_CONFIGURED_BY_DESIGN (Strict Phase 1 Scope)",
      verifiedAssetsCount: 10,
    },
  });
}
