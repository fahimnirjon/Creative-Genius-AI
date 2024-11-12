import HistoryTable from "@/components/HistoryTable";
import { getQueries } from "@/lib/actions";

const HistoryPage = async () => {
	const queries = await getQueries();
	return (
		<div className="p-10 my-5 mx-5 mb-5 rounded-lg dark:bg-gray-900 flex flex-col justify-center ">
			<h1 className="text-xl font-bold text-center">Histroy</h1>
			<p className="text-center">Your search history</p>
			<HistoryTable query={queries.data!} />
		</div>
	);
};

export default HistoryPage;
