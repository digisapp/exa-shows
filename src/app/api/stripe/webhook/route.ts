import { NextRequest, NextResponse } from "next/server";
import { getStripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe/config";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.expired",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    if (!STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook signature
    const stripe = getStripe();
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Validate event age (reject events older than 5 minutes)
    const eventAge = Date.now() / 1000 - event.created;
    if (eventAge > 300) {
      console.warn(`Rejecting old event: ${event.id} (age: ${eventAge}s)`);
      return NextResponse.json(
        { error: "Event too old" },
        { status: 400 }
      );
    }

    // Only process allowed events
    if (!ALLOWED_EVENTS.has(event.type)) {
      console.log(`Ignoring event type: ${event.type}`);
      return NextResponse.json({ received: true });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session expired: ${session.id}`);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed: ${paymentIntent.id}`);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("Processing checkout.session.completed:", session.id);

  const { showId, ticketTypeId, quantity } = session.metadata || {};

  if (!showId || !ticketTypeId) {
    console.error("Missing metadata in session:", session.id);
    return;
  }

  // TODO: Create ticket record in database
  // const ticket = await createTicket({
  //   showId,
  //   ticketTypeId,
  //   quantity: parseInt(quantity || "1"),
  //   stripeSessionId: session.id,
  //   stripePaymentIntentId: session.payment_intent as string,
  //   customerEmail: session.customer_details?.email || "",
  //   customerName: session.customer_details?.name || "",
  //   pricePaid: session.amount_total || 0,
  //   paymentStatus: "succeeded",
  // });

  console.log(`Ticket created for session: ${session.id}`);

  // TODO: Send confirmation email with QR code
  // await sendTicketConfirmationEmail(ticket);
}
