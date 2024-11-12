import Image from "next/image";

interface Props {
	query: {
		query: string;
		template: any;
		id: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
		contents: string | null;
	}[];
}
const HistoryTable = ({ query }: Props) => {
	const wordCount = (text: string) => text.split(" ").length;
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle">
						<table className="min-w-full divide-y divide-gray-300 dark:bg-transparent ">
							<thead className="dark:text-white text-gray-900">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6 lg:pl-8"
									>
										Template
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold"
									>
										Query
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold"
									>
										Word Count
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white dark:bg-transparent dark:text-white">
								{query.map((q) => (
									<tr key={q.id} className="text-gray-900 dark:text-white">
										<td className="whitespace-nowrap flex gap-2 items-center py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 lg:pl-8">
											<Image
												src={q.template.icon}
												alt="icon"
												width={40}
												height={40}
											/>
											<span>{q.template.name}</span>
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sms">
											{q.query}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sms">
											{q.createdAt.toDateString()}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sms">
											{wordCount(q.contents!)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryTable;
