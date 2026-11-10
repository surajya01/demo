import { z } from "zod";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const EnquirySchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email().optional().or(z.literal("")),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  adults: z.number().optional().default(2),
  preferredRoomTypeId: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = EnquirySchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Invalid enquiry submission data",
            details: result.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    logger.info("New guest enquiry received", "EnquiryAPI", result.data);

    return Response.json({
      success: true,
      message: "Thank you for reaching out! Our reservations desk will contact you shortly.",
      data: {
        id: `ENQ-${Date.now().toString().slice(-6)}`,
        guestName: result.data.guestName,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error("Failed to process enquiry", error, "EnquiryAPI");
    return Response.json(
      {
        success: false,
        error: {
          code: "SUBMIT_FAILED",
          message: "Unable to submit enquiry at this time. Please contact us via WhatsApp or Phone.",
        },
      },
      { status: 500 }
    );
  }
}
