import { NextRequest, NextResponse } from "next/server";
import { UpdateEnquirySchema } from "@dhuri/validation";
import { bookingService } from "@/services/booking.service";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "A valid enquiry ID is required.",
          },
        },
        { status: 400 }
      );
    }

    const enquiry = await bookingService.getEnquiryById(id);

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: error.statusCode }
      );
    }

    logger.error("Failed to fetch enquiry by ID", error, "EnquiryDetailAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ENQUIRY_LOOKUP_FAILED",
          message: "Unable to retrieve enquiry details.",
        },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "A valid enquiry ID is required.",
          },
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validation = UpdateEnquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid enquiry update payload.",
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const updated = await bookingService.updateEnquiry(id, validation.data);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: error.statusCode }
      );
    }

    logger.error("Failed to update enquiry", error, "EnquiryUpdateAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ENQUIRY_UPDATE_FAILED",
          message: "Unable to update enquiry.",
        },
      },
      { status: 500 }
    );
  }
}

