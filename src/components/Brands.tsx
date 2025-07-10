import { growth, tiger } from "../assets";

function Brands() {
	return (
		<div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
			<div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl lg:mx-0 lg:max-w-none">
				{/* Adidas - Mantida como marca esportiva relevante */}
				<img
					alt="Adidas"
					src="https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png"
					height={64}
					className="max-h-12 w-full object-contain"
				/>

				{/* Red Bull - Adaptada para energia/performance */}
				<img
					alt="Red Bull"
					src="https://logodownload.org/wp-content/uploads/2014/10/red-bull-logo-2-1.png"
					height={64}
					className="max-h-12 w-full object-contain"
				/>

				{/* Tiger - Substituída por uma marca de suplementos */}
				<img
					alt="Growth"
					src={growth}
					height={64}
					className="max-h-12 w-full object-contain"
				/>

				{/* Growth - Substituída por outra marca fitness */}
				<img
					alt="Tiger"
					src={tiger}
					height={64}
					className="max-h-12 w-full object-contain"
				/>
			</div>

			<div className="mt-16 flex justify-center">
				<p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm/6 text-gray-600 ring-1 ring-gray-900/5 ring-inset">
					<span className="hidden md:inline">
						Mais de 2.000 alunos transformaram seus corpos com nossos métodos.
					</span>
					<a href="#" className="font-semibold text-yellow-600">
						<span aria-hidden="true" className="absolute inset-0" /> Veja
						depoimentos <span aria-hidden="true">&rarr;</span>
					</a>
				</p>
			</div>
		</div>
	);
}

export default Brands;
