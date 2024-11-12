"use client";
import { auth } from "@/auth";
import { createCheckoutSession } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/20/solid";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const tiers = [
	{
		name: "Monthly Membership",
		id: "tier-personal",
		href: "#",
		priceMonthly: "$9.99",
		description:
			"Enjoy unlimited AI generated content forever for just $9.99/month",
		features: [
			"Unlimited word generation",
			"Advanced AI features",
			"Faster processing times",
			"Priority customer support",
		],
		featured: true,
	},
	{
		name: "Free",
		id: "tier-team",
		href: "#",
		priceMonthly: "$0",
		description: "Limited AI generated content forever for just $0.00/months.",
		features: [
			"Limited word generation",
			"Advanced AI features",
			"Faster processing times",
			"Customer support",
		],
		featured: false,
	},
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function PlanCard({ user }: { user: User }) {
	const router = useRouter();
	const handleCheckout = async (name: string) => {
		if (name === "Free") {
			router.push("/dashboard");
		} else {
			try {
				const res = await createCheckoutSession();
				if (res.error) {
					toast.error(res.error);
				}
				if (res.url) {
					window.location.href = res.url;
				}
			} catch (error) {
				toast.error("Something went wrong");
			}
		}
	};
	return (
		<div className="isolat px-6 py-24 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
				<h2 className="text-xl font-bold leading-7 text-emerald-500 dark:text-white">
					Upgrade with monthly membership
				</h2>
			</div>
			{/* <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
				Qui iusto aut est earum eos quae. Eligendi est at nam aliquid ad quo
				reprehenderit in aliquid fugiat dolorum voluptatibus.
			</p> */}
			<div className="mx-auto mt-16 gap-4 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
				{tiers.map((tier, tierIdx) => (
					<div
						key={tier.id}
						className={classNames(
							tier.featured
								? "relative dark:bg-black dark:text-white bg-white shadow-2xl"
								: "dark:bg-black dark:text-white sm:mx-8 lg:mx-0",
							tier.featured ? "" : tierIdx === 0 ? "rounded-3xl" : "",
							"rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
						)}
					>
						<h3
							id={tier.id}
							className="text-base font-semibold leading-7 text-emerald-500 dark:text-white"
						>
							{tier.name}
						</h3>
						<p className="mt-4 flex items-baseline gap-x-2">
							<span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
								{tier.priceMonthly}
							</span>
							<span className="text-base text-gray-500 dark:text-white">
								/month
							</span>
						</p>
						<p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
							{tier.description}
						</p>
						<ul
							role="list"
							className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10 dark:text-white"
						>
							{tier.features.map((feature) => (
								<li key={feature} className="flex gap-x-3">
									<CheckIcon
										className="h-6 w-5 flex-none text-indigo-600"
										aria-hidden="true"
									/>
									{feature}
								</li>
							))}
						</ul>
						<button
							onClick={() => handleCheckout(tier.name)}
							className={classNames(
								"bg-emerald-500 dark:bg-white dark:text-black text-white shadow hover:bg-emerald-700",

								"mt-8 block w-full rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:mt-10"
							)}
						>
							{user?.email ? "Get Started" : "Sign in"}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
