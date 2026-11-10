import { NextRequest, NextResponse } from "next/server";
import { CreateBookingHoldSchema } from "@dhuri/validation";
import { bookingEngineService } from "@/services/booking-engine.service";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = CreateBookingHoldSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid booking hold request parameters.",
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const holdResult = await bookingEngineService.createHold(validation.data);

    return NextResponse.json(
      {
        success: true,
        data: holdResult,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        },
        { status: error.statusCode }
      );
    }

    logger.error("Failed to create temporary booking hold", error, "HoldAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "HOLD_CREATION_FAILED",
          message: "Unable to reserve inventory hold. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}

