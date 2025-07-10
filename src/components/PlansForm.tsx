import { CheckIcon } from "@heroicons/react/16/solid";

const pricing = {
	tiers: [
		{
			name: "Plano Básico",
			id: "basico",
			price: { monthly: "R$99", annually: "R$999" },
			description: "O essencial para começar sua jornada fitness.",
			features: [
				"Acesso à academia em horário comercial",
				"1 aula coletiva por semana",
				"Acompanhamento básico de evolução",
			],
			featured: false,
		},
		{
			name: "Plano Intermediário",
			id: "intermediario",
			price: { monthly: "R$149", annually: "R$1.499" },
			description: "Para quem quer evoluir com mais recursos.",
			features: [
				"Acesso ilimitado à academia",
				"3 aulas coletivas por semana",
				"Acompanhamento nutricional básico",
				"Acesso à piscina",
			],
			featured: false,
		},
		{
			name: "Plano Premium",
			id: "premium",
			price: { monthly: "R$199", annually: "R$1.999" },
			description: "O plano completo para resultados acelerados.",
			features: [
				"Acesso 24 horas",
				"Aulas coletivas ilimitadas",
				"Personal trainer 2x na semana",
				"Plano nutricional completo",
				"Massagem relaxante mensal",
				"Acesso a todas as áreas (piscina, sauna, spa)",
			],
			featured: true,
		},
		{
			name: "Plano Família",
			id: "familia",
			price: { monthly: "R$349", annually: "R$3.499" },
			description: "Para quem quer cuidar da saúde com quem ama.",
			features: [
				"4 pessoas da mesma família",
				"Acesso ilimitado para todos",
				"Aulas coletivas ilimitadas",
				"Desconto em serviços extras",
				"Kids club para as crianças",
				"Eventos familiares mensais",
			],
			featured: false,
		},
	],
};

function PlansForm() {
	return (
		<form className="group/tiers pt-24 sm:pt-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-base/7 font-semibold text-yellow-600">
						Nossos Planos de Aulas
					</h1>
					<p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
						Saúde fitness que cabe no seu bolso
					</p>
				</div>
				<p className="mx-auto max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
					Escolha o plano ideal para seus objetivos, com a melhor estrutura para
					transformar seu corpo, melhorar sua saúde e alcançar resultados
					extraordinários na Pizza Fit.
				</p>
				<div className="mt-16 flex justify-center">
					<fieldset aria-label="Payment frequency">
						<div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-gray-200 ring-inset">
							<label className="group relative rounded-full px-2.5 py-1 has-checked:bg-yellow-600">
								<input
									defaultValue="monthly"
									defaultChecked
									name="frequency"
									type="radio"
									className="absolute inset-0 appearance-none rounded-full"
								/>
								<span className="text-gray-500 group-has-checked:text-white">
									Mensal
								</span>
							</label>
							<label className="group relative rounded-full px-2.5 py-1 has-checked:bg-yellow-600">
								<input
									defaultValue="annually"
									name="frequency"
									type="radio"
									className="absolute inset-0 appearance-none rounded-full"
								/>
								<span className="text-gray-500 group-has-checked:text-white">
									Anual
								</span>
							</label>
						</div>
					</fieldset>
				</div>
				<div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
					{pricing.tiers.map((tier) => (
						<div
							key={tier.id}
							data-featured={tier.featured ? "true" : undefined}
							className="group/tier rounded-3xl p-8 ring-1 ring-gray-300 data-featured:ring-2 data-featured:ring-yellow-600"
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={`tier-${tier.id}`}
									className="text-lg/8 font-semibold text-gray-900 group-data-featured/tier:text-yellow-600"
								>
									{tier.name}
								</h3>
								<p className="rounded-full bg-yellow-600/10 px-2.5 py-1 text-xs/5 font-semibold text-yellow-600 group-not-data-featured/tier:hidden">
									Mais popular
								</p>
							</div>
							<p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p>
							<p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden">
								<span className="text-4xl font-semibold tracking-tight text-gray-900">
									{tier.price.monthly}
								</span>
								<span className="text-sm/6 font-semibold text-gray-600">
									/mensal
								</span>
							</p>
							<p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=annually]:checked]/tiers:hidden">
								<span className="text-4xl font-semibold tracking-tight text-gray-900">
									{tier.price.annually}
								</span>
								<span className="text-sm/6 font-semibold text-gray-600">
									/anual
								</span>
							</p>
							<button
								value={tier.id}
								name="tier"
								type="submit"
								aria-describedby={`tier-${tier.id}`}
								className="mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-yellow-600 ring-1 ring-yellow-200 ring-inset group-data-featured/tier:bg-yellow-600 group-data-featured/tier:text-white group-data-featured/tier:shadow-xs group-data-featured/tier:ring-0 hover:ring-yellow-300 group-data-featured/tier:hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
							>
								Comprar Plano
							</button>
							<ul
								role="list"
								className="mt-8 space-y-3 text-sm/6 text-gray-600"
							>
								{tier.features.map((feature) => (
									<li key={feature} className="flex gap-x-3">
										<CheckIcon
											aria-hidden="true"
											className="h-6 w-5 flex-none text-yellow-600"
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</form>
	);
}

export default PlansForm;
