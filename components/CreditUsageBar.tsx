import { countContext } from "@/context/UsageProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const CreditsUsageBar = () => {
	const ctx = useContext(countContext);
	const router = useRouter();
	const credits = 10000;
	const percentage =
		ctx?.subStatus === "active" ? 100 : (ctx?.count! / credits) * 100;
	return (
		<div>
			<p className="font-bold text-white">Credits usage</p>
			<div className="mt-3" aria-hidden="true">
				<div className="overflow-hidden rounded-full bg-gray-200">
					<div
						className="h-2 rounded-full bg-indigo-600"
						style={{
							width: `${percentage}%`,
						}}
					/>
				</div>
				<div className="mt-3 text-white font-semibold">
					<div>
						{ctx?.subStatus === "active"
							? "unlimit credits"
							: `${ctx?.count!} / ${credits} usage`}
					</div>
				</div>
				{ctx?.subStatus === "active" ? null : (
					<button
						onClick={() => router.push("/membership")}
						className="hover:scale-105 transition-all ease-in-out bg-emerald-500 my-4 text-white w-full px-4 py-3 rounded-lg"
					>
						Upgrade
					</button>
				)}
			</div>
		</div>
	);
};

export default CreditsUsageBar;
