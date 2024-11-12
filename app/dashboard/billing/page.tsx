"use client";
import { createCustomerPortal } from "@/lib/actions";

const BillingPage = () => {
	const handleClick = async () => {
		const res = await createCustomerPortal();

		if (res?.url) {
			window.location.href = res.url;
		}
	};
	return (
		<div className="p-10 h-screen my-5 mx-5 mb-5 flex flex-col rounded-lg dark:bg-gray-900">
			<div>
				<h1 className="text-2xl font-bold text-center text-emerald-500">
					Billing
				</h1>
				<p className="text-center">Your Billing history</p>
			</div>
			<button
				onClick={handleClick}
				className="mt-5 bg-emerald-500 self-center hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg"
			>
				Access Stripe Customer Portal
			</button>
		</div>
	);
};

export default BillingPage;
