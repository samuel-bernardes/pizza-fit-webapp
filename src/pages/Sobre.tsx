import { ana, bianca, leticia, samuel } from "../assets";

const team = [
	{
		name: "Samuel Bernardes",
		role: "Especialista em Performance",
		bio: "Com certificação internacional em treinamento funcional, Samuel transforma vidas há mais de 8 anos. Seu lema: 'Cada movimento conta!'",
		imageUrl: samuel,
		specialties: [
			"Treinamento de força",
			"Condicionamento físico",
			"Recuperação muscular",
		],
	},
	{
		name: "Letícia Pires",
		role: "Coach de Bem-Estar Integral",
		bio: "Nutricionista esportiva e instrutora de yoga, Letícia ajuda a encontrar o equilíbrio entre corpo e mente.",
		imageUrl: leticia,
		specialties: ["Nutrição esportiva", "Yoga terapêutico", "Mindfulness"],
	},
	{
		name: "Bianca Marçal Pacífico",
		role: "Head de Programas Coletivos",
		bio: "Coreógrafa e ex-atleta, traz energia contagiante para nossas aulas em grupo. Suas sessões de HIIT são lendárias!",
		imageUrl: bianca,
		specialties: ["HIIT", "Dança fitness", "Treino funcional"],
	},
	{
		name: "Ana Luiza Reis",
		role: "Diretora de Experiência do Aluno",
		bio: "Com background em psicologia esportiva, Ana cria jornadas personalizadas que mantêm nossos alunos motivados e comprometidos.",
		imageUrl: ana,
		specialties: [
			"Psicologia do esporte",
			"Programação neurolinguística",
			"Gestão de metas",
		],
	},
];
function Sobre() {
	return (
		<main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
			{/* Introdução */}
			<section className="text-center mb-20">
				<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
					Sobre a <span className="text-yellow-600">Pizza Fit</span>
				</h1>
				<p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					Transformando vidas através de uma abordagem única que combina saúde,
					acolhimento e inovação. Na Pizza Fit, cada aluno é parte da nossa
					família.
				</p>
			</section>

			{/* Missão, Visão e Valores */}
			<section className="mb-24">
				<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
					Nossos <span className="text-yellow-600">Pilares</span>
				</h2>

				<div className="grid gap-8 md:grid-cols-3">
					{/* MISSÃO */}
					<article className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
						<div className="bg-yellow-100 p-4 rounded-full mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-12 w-12 text-yellow-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-3">Missão</h3>
						<p className="text-center text-gray-600">
							Promover saúde e qualidade de vida acessível para todos através do
							movimento, inovação e acolhimento.
						</p>
					</article>

					{/* VISÃO */}
					<article className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
						<div className="bg-blue-100 p-4 rounded-full mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-12 w-12 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-3">Visão</h3>
						<p className="text-center text-gray-600">
							Ser referência no segmento fitness pela proximidade com o aluno,
							excelência em atendimento e ambiente inspirador.
						</p>
					</article>

					{/* VALORES */}
					<article className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
						<div className="bg-pink-100 p-4 rounded-full mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-12 w-12 text-pink-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-3">Valores</h3>
						<div className="grid grid-cols-2 gap-2 mt-2">
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-600 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-gray-700">Acolhimento</span>
							</div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-600 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-gray-700">Inovação</span>
							</div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-600 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-gray-700">Saúde</span>
							</div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-yellow-600 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-gray-700">Diversão</span>
							</div>
						</div>
					</article>
				</div>
			</section>

			{/* Diferenciais */}
			<section className="mb-20 max-w-4xl mx-auto">
				<div className="bg-gradient-to-r from-yellow-50 to-gray-50 rounded-3xl p-8 sm:p-12 shadow-inner">
					<h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Por que escolher a{" "}
						<span className="text-yellow-600">Pizza Fit</span>?
					</h3>
					<div className="grid gap-6 sm:grid-cols-2">
						{[
							{
								icon: "HomeModernIcon",
								title: "Estrutura Moderna",
								desc: "Ambiente climatizado e equipamentos de última geração",
							},
							{
								icon: "CurrencyDollarIcon",
								title: "Planos Acessíveis",
								desc: "Opções para todos os bolsos e objetivos",
							},
							{
								icon: "UserGroupIcon",
								title: "Profissionais Capacitados",
								desc: "Equipe especializada e atenciosa",
							},
							{
								icon: "ChartBarIcon",
								title: "Acompanhamento",
								desc: "Avaliação física e evolução personalizada",
							},
							{
								icon: "MusicalNoteIcon",
								title: "Aulas Dinâmicas",
								desc: "Programas variados e temáticos",
							},
							{
								icon: "HeartIcon",
								title: "Comunidade",
								desc: "Ambiente acolhedor e familiar",
							},
						].map((item, index) => (
							<div key={index} className="flex">
								<div className="flex-shrink-0 mr-4">
									<div className="bg-yellow-100 p-3 rounded-lg">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-yellow-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											{/* Ícone dinâmico seria implementado com importação real dos ícones */}
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
									</div>
								</div>
								<div>
									<h4 className="text-lg font-semibold text-gray-900">
										{item.title}
									</h4>
									<p className="mt-1 text-gray-600">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Chamada para ação */}

			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl sm:text-center">
					<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
						Conheça nosso time
					</h2>
					<p className="mt-6 text-lg/8 text-gray-600">
						Na Pizza Fit, somos movidos pela paixão em transformar vidas. Nossa
						equipe dedicada combina expertise técnica com um acolhimento genuíno
						para ajudar cada aluno a alcançar seus melhores resultados.
					</p>
				</div>
				<ul
					role="list"
					className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
				>
					{team.map((person) => (
						<li key={person.name} className="flex flex-col gap-6 xl:flex-row">
							<img
								alt=""
								src={person.imageUrl}
								className="aspect-4/5 w-52 flex-none rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5"
							/>
							<div className="flex-auto">
								<h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
									{person.name}
								</h3>
								<p className="text-base/7 text-gray-600">{person.role}</p>
								<p className="mt-6 text-base/7 text-gray-600">{person.bio}</p>
								<div className="mt-4">
									<h4 className="text-xs font-medium text-gray-500">
										ESPECIALIDADES
									</h4>
									<div className="mt-2 flex flex-wrap gap-2">
										{person.specialties.map((spec) => (
											<span
												key={spec}
												className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
											>
												{spec}
											</span>
										))}
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}

export default Sobre;
