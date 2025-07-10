import { Brands, Faq, PlansForm } from "../components";

function Home() {
	return (
		<div>
			<main>
				{/* Pricing section */}
				<PlansForm />

				{/* Logo cloud */}
				<Brands />

				<Faq />
			</main>
		</div>
	);
}

export default Home;
