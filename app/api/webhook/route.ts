import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-09-30.acacia",
});

export async function POST(req: NextRequest) {
	const sig = req.headers.get("stripe-signature");
	const body = await req.text();
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			const transaction = await prisma.transaction.create({
				data: {
					amount: session.amount_total!,
					customerId: session.customer?.toString()!,
					email: session.customer_email!,
					invoiceId: session.invoice?.toString()!,
					mode: session.mode,
					paymentStatus: session.payment_status,
					sessionId: session.id,
					status: session.status!,
					subscriptionId: session.subscription?.toString()!,
				},
			});
			if (transaction) {
				return NextResponse.json("Checkout session completed", { status: 201 });
			}
		}
	} catch (error) {
		return NextResponse.json("Something went wrong");
	}
}
