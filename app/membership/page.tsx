import { auth } from "@/auth";
import PlanCard from "@/components/PlanCard";

const MembershipPage = async () => {
	const session = await auth();
	return (
		<div>
			<PlanCard user={session?.user!} />
		</div>
	);
};

export default MembershipPage;
