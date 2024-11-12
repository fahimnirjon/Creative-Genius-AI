"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Stripe from "stripe";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
interface CheckoutSessionResponse {
	url?: string;
	error?: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-09-30.acacia",
});

export const genContent = async (prompt: string) => {
	try {
		const result = await model.generateContent(prompt);
		return {
			content: result.response.text(),
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			error: "Some error occurred",
		};
	}
};
export const saveQuery = async ({
	template,
	content,
	query,
}: {
	template: any;
	content: string;
	query: string;
}) => {
	const session = await auth();
	try {
		const newQuery = await prisma.query.create({
			data: {
				template,
				email: session?.user?.email!,
				contents: content,
				query,
			},
		});
		if (newQuery) {
			return {
				status: "success",
			};
		}
	} catch (error) {
		return {
			status: "error",
		};
	}
};
export const getQueries = async () => {
	const session = await auth();
	try {
		const queries = await prisma.query.findMany({
			where: {
				email: session?.user?.email!,
			},
		});
		return {
			data: queries,
		};
	} catch (error) {
		return {
			status: "error",
		};
	}
};
export const countUsage = async () => {
	const session = await auth();
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();
	// console.log(session?.user?.email, "from  count action");
	// const count = await prisma.query.aggregate({
	// 	where: {
	// 		email: session?.user?.email!,

	// 			createdAt:{
	// 				equals:{
	// 					getFullYear: currentYear,
	// 					},
	// 				}
	// 			}
	// 		}
	// 	},
	const records = await prisma.query.findMany({
		where: {
			email: session?.user?.email!,
		},
		select: {
			contents: true,
		},
	});
	// console.log(records);
	return records;
};
export const createCheckoutSession =
	async (): Promise<CheckoutSessionResponse> => {
		const session = await auth();
		if (!session?.user?.email) {
			return {
				error: "User not found",
			};
		}
		try {
			const existingTransaction = await prisma.transaction.findFirst({
				where: {
					email: session.user.email,
				},
			});
			if (existingTransaction) {
				const subscription = await stripe.subscriptions.list({
					customer: existingTransaction.customerId,
					status: "all",
					limit: 1,
				});
				const currentSubscription = subscription.data.find(
					(sub) => sub.status === "active"
				);
				if (currentSubscription) {
					return {
						error: "You already have an active subscription",
					};
				}
			}
			const checkoutSession = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: [
					{
						price: process.env.STRIPE_PRICE_ID,
						quantity: 1,
					},
				],
				customer_email: session.user.email,
				mode: "subscription",
				success_url: `${process.env.WEB_URL}/dashboard`,
				cancel_url: `${process.env.WEB_URL}`,
			});
			return {
				url: checkoutSession.url!,
			};
		} catch (error) {
			console.log(error);
			return {
				error: "Something went wrong while creating checkout session",
			};
		}
	};
export const checkSubscriptionStatus = async () => {
	const session = await auth();
	try {
		const transaction = await prisma.transaction.findFirst({
			where: {
				email: session?.user?.email!,
				status: "complete",
			},
		});
		if (transaction && transaction.subscriptionId) {
			const subsData = await stripe.subscriptions.retrieve(
				transaction.subscriptionId
			);
			if (subsData.status === "active") {
				return {
					status: "active",
				};
			} else {
				return {
					status: "inactive",
				};
			}
		}
	} catch (error) {
		return {
			status: "error",
			message: "Something went wrong",
		};
	}
};
export const createCustomerPortal = async () => {
	const session = await auth();

	if (session?.user?.email) {
		try {
			const transaction = await prisma.transaction.findFirst({
				where: {
					email: session.user.email,
				},
			});
			if (transaction) {
				const portal = await stripe.billingPortal.sessions.create({
					customer: transaction.customerId,
					return_url: `${process.env.WEB_URL}/dashboard`,
				});
				return {
					url: portal.url ?? `${process.env.WEB_URL}/dashboard`,
				};
			}
		} catch (error) {
			console.log(error);
			return {
				status: "error",
				message: "Failed to create customer portal",
			};
		}
	}
};
