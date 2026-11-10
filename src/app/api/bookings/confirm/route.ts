import { NextRequest, NextResponse } from "next/server";
import { CreateBookingSchema } from "@apexify/validation";
import { bookingEngineService } from "@/services/booking-engine.service";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = CreateBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid reservation confirmation data.",
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const bookingResult = await bookingEngineService.confirmBooking(validation.data);

    return NextResponse.json(
      {
        success: true,
        data: bookingResult,
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

    logger.error("Failed to confirm reservation", error, "BookingConfirmAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CONFIRMATION_FAILED",
          message: "Unable to complete reservation. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}

