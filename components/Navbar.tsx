"use client";
import { Fragment } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];
const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: { user: User }) {
	const { setTheme, resolvedTheme } = useTheme();
	return (
		<Disclosure as="header" className="bg-gray-800 fixed w-full">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
						<div className="relative flex h-16 justify-between">
							<div className="relative text-white text-3xl font-bold italic z-10 flex px-2 lg:px-0">
								<div className="flex flex-shrink-0 items-center">
									<Link href={"/"}>Next Gen AI</Link>
								</div>
							</div>
							<div className="relative text-white z-0 flex flex-1 items-center justify-center px-2 mx-auto">
								{user && <Link href={"/dashboard"}> Dashboard</Link>}
							</div>
							<div className="relative z-10 flex items-center lg:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
							<div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
								{/* Profile dropdown */}
								<button
									onClick={() =>
										setTheme(resolvedTheme === "dark" ? "light" : "dark")
									}
									className="h-12 w-12 rounded-lg p-2"
								>
									{resolvedTheme === "dark" ? (
										<svg
											className="fill-violet-700 block"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
										</svg>
									) : (
										<svg
											className="fill-yellow-500  dark:block"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
												fillRule="evenodd"
												clipRule="evenodd"
											></path>
										</svg>
									)}
								</button>
								{user && (
									<Menu as="div" className="relative ml-4 flex-shrink-0">
										<div>
											<MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src={user?.image!}
													alt=""
												/>
											</MenuButton>
										</div>
										<Transition
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												{userNavigation.map((item) => (
													<MenuItem key={item.name}>
														{({ focus }) => (
															<a
																href={item.href}
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																{item.name}
															</a>
														)}
													</MenuItem>
												))}
											</MenuItems>
										</Transition>
									</Menu>
								)}
								{!user && (
									<button
										onClick={() => signIn("github")}
										type="button"
										className="rounded bg-indigo-500 px-6 py-[10px] text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
									>
										Sign In
									</button>
								)}
							</div>
						</div>
						{/* <nav
							className="hidden lg:flex lg:space-x-8 lg:py-2"
							aria-label="Global"
						>
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</a>
							))}
						</nav> */}
					</div>

					<DisclosurePanel as="nav" className="lg:hidden" aria-label="Global">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md py-2 px-3 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
						<div className="border-t border-gray-700 pb-3 pt-4">
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full"
										src={user?.image!}
										alt=""
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-white">
										{user?.name}
									</div>
									<div className="text-sm font-medium text-gray-400">
										{user?.email}
									</div>
								</div>
							</div>
							<div className="mt-3 space-y-1 px-2">
								{userNavigation.map((item) => (
									<DisclosureButton
										key={item.name}
										as="a"
										href={item.href}
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
									>
										{item.name}
									</DisclosureButton>
								))}
							</div>
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
