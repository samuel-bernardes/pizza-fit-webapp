const units = [
	{
		id: 1,
		nome: "Pizza Fit Centro",
		endereco: "Av. Paulista, 1000 - São Paulo/SP",
		foto: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3175&q=80",
		equipamentos: "Área completa de musculação, piscina e 3 studios de aula",
		horario: "Seg a Sex: 6h-23h | Sáb: 8h-18h",
	},
	{
		id: 2,
		nome: "Pizza Fit Zona Sul",
		endereco: "R. Oscar Freire, 2000 - São Paulo/SP",
		foto: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
		equipamentos: "Crossfit, MMA e área de treino funcional",
		horario: "Seg a Sex: 5h-22h | Sáb: 7h-17h",
	},
	{
		id: 3,
		nome: "Pizza Fit Barra",
		endereco: "Av. das Américas, 5000 - Rio de Janeiro/RJ",
		foto: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80",
		equipamentos: "Área VIP, spa e restaurante fitness",
		horario: "Seg a Sex: 6h-24h | Sáb: 8h-20h",
	},
];

function Units() {
	return (
		<div>
			<main>
				<div className="bg-white py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
								Nossas Unidades
							</h2>
							<p className="mt-2 text-lg/8 text-gray-600">
								Conheça nossas academias e encontre a mais perto de você
							</p>
						</div>
						<div className="mx-auto mt-12 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
							{units.map((unit) => (
								<article
									key={unit.id}
									className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
								>
									<img
										alt={unit.nome}
										src={unit.foto}
										className="absolute inset-0 -z-10 size-full object-cover"
									/>
									<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
									<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

									<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
										<span className="mr-8">{unit.horario}</span>
										<div className="-ml-4 flex items-center gap-x-4">
											<svg
												viewBox="0 0 2 2"
												className="-ml-0.5 size-0.5 flex-none fill-white/50"
											>
												<circle r={1} cx={1} cy={1} />
											</svg>
											<div className="flex gap-x-2.5">
												<span className="truncate">{unit.equipamentos}</span>
											</div>
										</div>
									</div>
									<h3 className="mt-3 text-lg/6 font-semibold text-white">
										<span className="absolute inset-0" />
										{unit.nome}
									</h3>
									<p className="mt-2 text-sm text-gray-300">{unit.endereco}</p>
								</article>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Units;
