import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const settingsUrl = process.env.AUTH_TRUST_HOST + "/settings";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // cancel at the billing portal
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // user's first time subscribing
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Course Create Pro",
              description: "unlimited course generation!",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id!,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[STRIPE ERROR]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
