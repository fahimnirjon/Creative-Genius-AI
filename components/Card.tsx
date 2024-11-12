import Image from "next/image";
import Link from "next/link";

interface Props {
	template: {
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
	};
}
const Card = ({ template }: Props) => {
	return (
		<Link href={`/dashboard/template/${template.slug}`}>
			<div className="dark:bg-black h-full bg-white overflow-hidden rounded-lg shadow hover:cursor-pointer hover:bg-gray-200">
				<div className="flex flex-col items-center px-4 py-3 sm:px-6">
					<Image
						src={template.icon}
						alt={template.name}
						width={50}
						height={50}
					/>
					<h1 className="text-lg font-medium mt-3">{template.name}</h1>
				</div>
				<div className="px-4 py-3 sm:px-6">
					<p className="text-gray-400">{template.desc}</p>
				</div>
			</div>
		</Link>
	);
};

export default Card;
