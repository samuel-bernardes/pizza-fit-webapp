import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default MainLayout;
