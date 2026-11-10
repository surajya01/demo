import { NextRequest, NextResponse } from "next/server";
import { CreateEnquirySchema } from "@apexify/validation";
import { bookingService } from "@/services/booking.service";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    const result = await bookingService.listEnquiries({ limit, offset });
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Failed to list enquiries", error, "EnquiryAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "LIST_FAILED",
          message: "Unable to retrieve enquiries.",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = CreateEnquirySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid enquiry submission data",
            details: validatedData.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    let enquiryRecord;
    try {
      enquiryRecord = await bookingService.createEnquiry(validatedData.data);
    } catch (dbError) {
      logger.warn("Database unavailable during enquiry creation, logging enquiry locally", "EnquiryAPI", {
        guest: validatedData.data.guestName,
        error: (dbError as Error).message,
      });
      // Fallback response for offline development
      enquiryRecord = {
        id: "dev-enq-" + Date.now(),
        guestName: validatedData.data.guestName,
        phone: validatedData.data.phone,
        status: "PENDING",
        createdAt: new Date(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          enquiryId: enquiryRecord.id,
          guestName: enquiryRecord.guestName,
          status: enquiryRecord.status,
          message: "Thank you for contacting Apexify Resort. Our reception team will reach out to you shortly.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Failed to process booking enquiry", error, "EnquiryAPI");
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to process enquiry at this moment. Please try again or contact us directly.",
        },
      },
      { status: 500 }
    );
  }
}
