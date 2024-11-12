("");
import { Fragment, useContext, useState } from "react";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { countContext } from "@/context/UsageProvider";

export default function Modal() {
	const ctx = useContext(countContext);
	return (
		<Transition show={ctx?.openModal}>
			<Dialog
				className="relative z-10"
				onClose={() => ctx?.setOpenModal(false)}
			>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-105"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-105"
						>
							<DialogPanel className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
								<div className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
									<h1 className="text-center text-emerald-500 text-xl font-bold">
										Join Membership
									</h1>
									<p className="text-red-600 text-center px-8 pt-4">
										You have reached 10000 words limit 😞. In order to generate
										awesome AI content you need to buy premium membership plan
									</p>
									<div className="mt-8 flex justify-center px-4 sm:px-6 lg:px-8">
										<Link
											href={"/membership"}
											className="rounded-md border border-transparent bg-emerald-500 px-8 py-3 font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
										>
											Join Membership
										</Link>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
