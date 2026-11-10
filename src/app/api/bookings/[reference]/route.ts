export const dynamic = "force-dynamic";

// In-memory demo bookings for guests trying the lookup portal
const DEMO_BOOKINGS: Record<string, any> = {
  "APEX-2026": {
    id: "demo-booking-1",
    bookingReference: "APEX-2026",
    status: "CONFIRMED",
    checkIn: "2026-12-10T14:00:00.000Z",
    checkOut: "2026-12-12T11:00:00.000Z",
    adults: 2,
    children: 1,
    subtotal: 7000,
    taxAmount: 840,
    totalAmount: 7840,
    specialRequests: "Pool-view room preference and early check-in requested.",
    createdAt: "2026-11-01T10:00:00.000Z",
    leadGuest: {
      fullName: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@example.com",
      city: "Mumbai",
      state: "Maharashtra",
    },
    bookingRooms: [
      {
        id: "room-item-1",
        quantity: 1,
        roomType: {
          name: "Deluxe Double Room",
          slug: "deluxe-double-room",
          bedConfiguration: "1 King Bed",
          images: [{ storagePath: "/images/resort/room_deluxe_double.jpg" }],
        },
        room: {
          roomNumber: "D-104",
          floorLabel: "Ground Floor",
        },
      },
    ],
  },
};

export async function GET(
  _req: Request,
  { params }: { params: { reference: string } }
) {
  const ref = params.reference?.trim().toUpperCase();

  if (ref && DEMO_BOOKINGS[ref]) {
    return Response.json({
      success: true,
      data: DEMO_BOOKINGS[ref],
    });
  }

  return Response.json(
    {
      success: false,
      error: {
        code: "BOOKING_NOT_FOUND",
        message: `Booking reference "${ref}" was not found in our records. For reservations booked via WhatsApp or at reception, please reach out directly at +91 98200 00000. (Tip: Try sample reference "APEX-2026")`,
      },
    },
    { status: 404 }
  );
}
