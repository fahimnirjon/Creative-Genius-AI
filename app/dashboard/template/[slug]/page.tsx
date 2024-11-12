"use client";
import { genContent, saveQuery } from "@/lib/actions";
import Templates from "@/lib/constants";
import Image from "next/image";
import { useContext, useState, use } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { countContext } from "@/context/UsageProvider";
interface Template {
	name: string;
	desc: string;
	category: string;
	icon: string;
	aiPrompt: string;
	slug: string;
	form: {
		label: string;
		field: string;
		name: string;
		required: boolean;
	}[];
}
interface Props {
	params: {
		slug: string;
	};
}
const TemplateDetailPage = (props: Props) => {
	// const params = await props.params
	const { slug } = props.params;
	const ctx = useContext(countContext);
	const [query, setQuery] = useState("");
	const [aiContent, setAiContent] = useState("");
	const [loading, setLoading] = useState(false);
	const template = Templates.find((t) => t.slug === slug);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await genContent(template?.aiPrompt + query);
			setAiContent(res?.content!);
			await saveQuery({
				content: res?.content!,
				query,
				template,
			});
			await ctx?.getUsage();
		} catch (error) {
			setAiContent("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-x-7">
			<div className="col-span-1 rounded-md shadow-lg border p-4">
				<div className="flex flex-col gap-4">
					<Image
						src={template?.icon!}
						alt={template?.name!}
						width={50}
						height={50}
					/>
					<h2 className="font-medium">{template?.name}</h2>
					<p className="text-gray-400">{template?.desc}</p>
				</div>
				<form onSubmit={handleSubmit}>
					{template?.form.map((f) => (
						<div className="my-3 flex flex-col" key={f.field}>
							<label className="pb-5 font-bold">{f.label}</label>
							{f.field === "input" ? (
								<input
									type="text"
									name={f.name}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="w-full border shadow-md outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2"
									placeholder={f.name}
								/>
							) : (
								<textarea
									rows={4}
									defaultValue={""}
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							)}
						</div>
					))}
					<button
						type="submit"
						disabled={
							loading || (ctx?.subStatus === "inactive" && ctx?.count! >= 10000)
						}
						className="bg-emerald-500 disabled:cursor-not-allowed my-4 text-white w-full px-4 py-3 rounded-lg"
					>
						{loading && <span className="animate-pulse">Generating...</span>}
						{ctx?.subStatus === "inactive" && ctx?.count! >= 10000
							? "Subscribe to generate content"
							: "Generate"}
					</button>
				</form>
			</div>
			<div className="col-span-2">
				<MarkdownEditor
					value={aiContent ?? "Content Generated With Ai Appear here..."}
					height={"400px"}
				/>
			</div>
		</div>
	);
};

export default TemplateDetailPage;
