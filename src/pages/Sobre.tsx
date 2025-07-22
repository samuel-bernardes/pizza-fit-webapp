function Sobre() {
	return (
		<main className="max-w-4xl mx-auto px-6 py-16">
			{/* Introdução */}
			<section className="text-center mb-16">
				<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
					Sobre a Pizza Fit
				</h1>
				<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
					A Pizza Fit nasceu para mostrar que saúde, acolhimento e inovação
					andam juntos. Valorizamos cada aluno e criamos experiências para
					transformar vidas de forma leve e divertida.
				</p>
			</section>

			{/* Missão, Visão e Valores */}
			<section className="mb-20">
				<h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
					Missão, Visão e Valores
				</h2>

				<div className="grid gap-10 sm:grid-cols-3">
					{/* MISSÃO - Haltere outline */}
					<article className="flex flex-col items-center bg-gray-900 rounded-2xl p-8 text-white shadow-lg">
						{/* Haltere (outline style) */}
						<svg
							className="w-10 h-10 mb-4 text-yellow-400"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<rect x="1" y="10" width="4" height="4" rx="1" />
							<rect x="19" y="10" width="4" height="4" rx="1" />
							<rect x="5" y="11" width="14" height="2" rx="1" />
						</svg>
						<h3 className="text-xl font-semibold mb-2 uppercase">Missão</h3>
						<p className="text-center text-sm text-gray-300">
							Promover saúde e qualidade de vida acessível para todos através do
							movimento, inovação e acolhimento.
						</p>
					</article>

					{/* VISÃO - Olho outline (mantido) */}
					<article className="flex flex-col items-center bg-gray-900 rounded-2xl p-8 text-white shadow-lg">
						<svg
							className="w-10 h-10 mb-4 text-blue-500"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<ellipse cx="12" cy="12" rx="9" ry="6" />
							<circle cx="12" cy="12" r="2.5" />
						</svg>
						<h3 className="text-xl font-semibold mb-2 uppercase">Visão</h3>
						<p className="text-center text-sm text-gray-300">
							Ser referência no segmento fitness pela proximidade com o aluno,
							excelência em atendimento e ambiente inspirador.
						</p>
					</article>

					{/* VALORES - Coração outline */}
					<article className="flex flex-col items-center bg-gray-900 rounded-2xl p-8 text-white shadow-lg">
						<svg
							className="w-10 h-10 mb-4 text-pink-500"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path d="M12 21s-6.5-5.48-9-8.5C1.4 10.36 2.4 8 5 8c1.54 0 3.04 1.02 3.57 2.36h1.87C13.96 9.02 15.46 8 17 8c2.6 0 3.6 2.36 2 4.5-2.5 3.02-9 8.5-9 8.5z" />
						</svg>
						<h3 className="text-xl font-semibold mb-2 uppercase">Valores</h3>
						<ul className="list-disc list-inside text-gray-300 text-sm text-center space-y-1 max-w-xs">
							<li>Acolhimento</li>
							<li>Inovação</li>
							<li>Saúde</li>
							<li>Diversão</li>
						</ul>
					</article>
				</div>
			</section>

			{/* Diferenciais */}
			<section className="mb-20 text-center max-w-3xl mx-auto">
				<h3 className="text-2xl font-semibold text-gray-900 mb-6">
					Nossos Diferenciais
				</h3>
				<ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
					<li>Estrutura moderna e ambiente acolhedor</li>
					<li>Planos acessíveis para todos os perfis</li>
					<li>Equipe de profissionais capacitados</li>
					<li>Acompanhamento individualizado</li>
					<li>Aulas temáticas e dinâmicas</li>
				</ul>
			</section>

			{/* Chamada para ação */}
			<section className="bg-yellow-100 rounded-2xl p-10 text-center max-w-3xl mx-auto shadow-lg">
				<h4 className="text-xl font-bold text-gray-900">Venha nos conhecer!</h4>
				<p className="mt-3 text-gray-700">
					Agende uma visita e descubra uma nova forma de conquistar saúde,
					disposição e bem-estar com a Pizza Fit.
				</p>
			</section>
		</main>
	);
}

export default Sobre;
