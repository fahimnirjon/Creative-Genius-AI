"use client";
import { checkSubscriptionStatus, countUsage } from "@/lib/actions";
import {
	createContext,
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
} from "react";
interface Count {
	count: number;
	getUsage: () => Promise<void>;
	openModal: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	subStatus: string;
}
export const countContext = createContext<Count | null>(null);
export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = useState(0);
	const [openModal, setOpenModal] = useState(false);
	const [subStatus, setSubStatus] = useState("");
	useEffect(() => {
		getUsage();
		getSubStatus();
	}, []);
	useEffect(() => {
		if (count > 10000) {
			setOpenModal(true);
		}
	}, [count]);
	const getUsage = async () => {
		const words = await countUsage();
		const totalWords = words.reduce((sum, record) => {
			const wordsCount = record?.contents?.trim().split(/\s+/).length;
			return sum + wordsCount!;
		}, 0);
		setCount(totalWords);
	};
	const getSubStatus = async () => {
		const res = await checkSubscriptionStatus();
		if (res?.status === "active") {
			setSubStatus("active");
		} else {
			setSubStatus("inactive");
		}
	};
	return (
		<countContext.Provider
			value={{ count, getUsage, openModal, setOpenModal, subStatus }}
		>
			{children}
		</countContext.Provider>
	);
};
