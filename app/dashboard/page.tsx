"use client";
import Card from "@/components/Card";
import templates from "@/lib/constants";
import { useState } from "react";
const DashboardPage = () => {
	const [search, setSearch] = useState("");
	const filteredTemplates = templates.filter((template) =>
		template.name.toLowerCase().includes(search.toLowerCase())
	);
	return (
		<>
			<div className="p-10 my-5 mx-5 mb-5 rounded-lg dark:bg-gray-900 flex flex-col justify-center items-center">
				<h1 className="text-xl">What would you like to create today?</h1>

				<div className="w-full flex justify-center">
					<div className="flex gap-2 items-center p-2 border shadow-lg rounded-md bg-transparent my-5 w-[50%]">
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredTemplates.map((template) => (
					<Card template={template} key={template.slug} />
				))}
			</div>
		</>
	);
};

export default DashboardPage;
