import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutRequest {
  showId: string;
  ticketTypeId: string;
  ticketTypeName: string;
  priceUsd: number; // In cents
  quantity: number;
  showTitle: string;
  customerEmail?: string;
  customerName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    const {
      showId,
      ticketTypeId,
      ticketTypeName,
      priceUsd,
      quantity,
      showTitle,
      customerEmail,
    } = body;

    // Validate required fields
    if (!showId || !ticketTypeId || !priceUsd || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${ticketTypeName} - ${showTitle}`,
              description: `Ticket for ${showTitle}`,
              images: [], // Add show cover image URL if available
            },
            unit_amount: priceUsd,
          },
          quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shows/${showId}`,
      metadata: {
        showId,
        ticketTypeId,
        quantity: quantity.toString(),
      },
      // Enable billing address collection
      billing_address_collection: "required",
      // Allow promo codes
      allow_promotion_codes: true,
      // Expiration (30 minutes)
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
