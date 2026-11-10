import { NextRequest, NextResponse } from "next/server";
import { bookingEngineService } from "@/services/booking-engine.service";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    const reference = params.reference;
    if (!reference || typeof reference !== "string" || reference.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "A valid booking reference is required.",
          },
        },
        { status: 400 }
      );
    }

    const booking = await bookingEngineService.getBookingByReference(reference.trim());

    return NextResponse.json({
      success: true,
      data: booking,
    });
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

    logger.error("Failed to retrieve booking by reference", error, "BookingLookupAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "BOOKING_LOOKUP_FAILED",
          message: "Unable to retrieve reservation details.",
        },
      },
      { status: 500 }
    );
  }
}

