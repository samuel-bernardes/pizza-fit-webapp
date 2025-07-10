import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { logo } from "../assets";
import { useNavigate } from "react-router";

function Header() {
	const navigation = [
		{ name: "Planos", href: "/planos" },
		{ name: "Unidades", href: "/unidades" },
		{ name: "Sobre", href: "/sobre" },
	];

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navigate = useNavigate();

	return (
		<header className="bg-white">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
			>
				<div className="flex flex-1">
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<span
								key={item.name}
								onClick={() => navigate(item.href)}
								className="text-lg font-semibold text-gray-900 cursor-pointer"
							>
								{item.name}
							</span>
						))}
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>
					</div>
				</div>
				<span
					onClick={() => navigate("/")}
					className="-m-1.5 p-1.5 cursor-pointer"
				>
					<img alt="logo" src={logo} className="h-32 w-auto" />
				</span>
				<div className="flex flex-1 justify-end">
					<span
						className="text-lg font-semibold cursor-pointer text-gray-900"
						onClick={() => navigate("/login")}
					>
						Área do Aluno <span aria-hidden="true">&rarr;</span>
					</span>
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
					<div className="flex items-center justify-between">
						<div className="flex flex-1">
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<span
							onClick={() => navigate("/")}
							className="-m-1.5 p-1.5 cursor-pointer"
						>
							<img alt="logo" src={logo} className="h-24 w-auto" />
						</span>
						{/* <div className="flex flex-1 justify-end">
							<a href="#" className="text-md font-semibold text-gray-900">
								Área do Aluno <span aria-hidden="true">&rarr;</span>
							</a>
						</div> */}
					</div>
					<div className="mt-6 space-y-2">
						{navigation.map((item) => (
							<span
								onClick={() => navigate(item.href)}
								key={item.name}
								className="-mx-3 cursor-pointer block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>
								{item.name}
							</span>
						))}
						<div className="mt-6">
							<span className="text-lg font-semibold cursor-pointer text-gray-900" onClick={() => navigate("/login")}>
								Área do Aluno <span aria-hidden="true">&rarr;</span>
							</span>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}

export default Header;
