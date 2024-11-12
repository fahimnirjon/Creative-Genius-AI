"use client";
import { Fragment, useState } from "react";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	ClockIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	WalletIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreditsUsageBar from "@/components/CreditUsageBar";
import Modal from "@/components/Modal";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
	{
		name: "History",
		href: "/dashboard/history",
		icon: ClockIcon,
		current: false,
	},
	{
		name: "Billing",
		href: "/dashboard/billing",
		icon: WalletIcon,
		current: false,
	},
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathName = usePathname();

	return (
		<>
			<div>
				<Transition show={sidebarOpen}>
					<Dialog className="relative lg:hidden" onClose={setSidebarOpen}>
						<TransitionChild
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-900/80" />
						</TransitionChild>

						<div className="fixed inset-0 flex">
							<TransitionChild
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
									<TransitionChild
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button
												type="button"
												className="-m-2.5 p-2.5"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</TransitionChild>
									{/* Sidebar component, swap this element with another sidebar if you like */}
									<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-2 ring-1 ring-white/10">
										<nav className="flex flex-1 flex-col">
											<ul role="list" className="flex flex-1 flex-col gap-y-7">
												<li>
													<ul role="list" className="-mx-2 space-y-1">
														{navigation.map((item) => (
															<li key={item.name}>
																<Link
																	href={item.href}
																	className={classNames(
																		item.current
																			? "bg-gray-800 text-white"
																			: "text-gray-400 hover:text-white hover:bg-gray-800",
																		"group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
																	)}
																>
																	<item.icon
																		className="h-6 w-6 shrink-0"
																		aria-hidden="true"
																	/>
																	{item.name}
																</Link>
															</li>
														))}
													</ul>
												</li>
											</ul>
										</nav>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:top-[64px] lg:bottom-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6">
						<nav className="flex pt-10 flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className={classNames(
														item.href === pathName
															? "bg-gray-800 text-white"
															: "text-gray-400 hover:text-white hover:bg-gray-800",
														"group flex gap-x-3 items-center rounded-md p-2 text-lg leading-6 font-semibold"
													)}
												>
													<item.icon
														className="h-8 w-8 shrink-0"
														aria-hidden="true"
													/>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li className=" mt-auto">
									<CreditsUsageBar />
								</li>
								<Modal />
							</ul>
						</nav>
					</div>
				</div>

				<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
					<button
						type="button"
						className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
					<div className="flex-1 text-sm font-semibold leading-6 text-white">
						Dashboard
					</div>
					<a href="#">
						<span className="sr-only">Your profile</span>
						<img
							className="h-8 w-8 rounded-full bg-gray-800"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</a>
				</div>

				<main className="py-10 pt-24 lg:pl-72">
					<div className="px-4 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</>
	);
}
