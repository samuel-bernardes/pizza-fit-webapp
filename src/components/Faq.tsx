import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

const faqs = [
	{
		question: "Qual é o horário de funcionamento da academia?",
		answer:
			"Funcionamos de segunda a sexta das 6h às 23h, e sábados das 8h às 18h. Domingo fechado para manutenção.",
	},
	{
		question: "Preciso agendar horário para treinar?",
		answer:
			"Não é necessário agendamento para uso da academia. Apenas para aulas específicas como spinning, pilates ou avaliação física.",
	},
	{
		question: "Os planos incluem acompanhamento nutricional?",
		answer:
			"Sim, nossos planos Premium e Família incluem acompanhamento nutricional mensal. Os demais planos podem adicionar esse serviço como extra.",
	},
	{
		question: "Posso congelar minha mensalidade?",
		answer:
			"Sim, oferecemos até 3 meses de congelamento por ano, mediante comprovação médica ou justificativa válida.",
	},
	{
		question: "A academia oferece aulas para iniciantes?",
		answer:
			"Com certeza! Temos aulas específicas para iniciantes e todos os novos alunos recebem uma orientação inicial gratuita com nossos professores.",
	},
	{
		question: "Qual a diferença entre os planos mensais e anuais?",
		answer:
			"Os planos anuais oferecem até 15% de desconto em relação aos mensais, além de benefícios extras como 1 mês grátis e prioridade em agendamentos.",
	},
	{
		question: "A Pizza Fit tem vestiários completos?",
		answer:
			"Sim, nossos vestiários possuem chuveiros, armários, secadores de cabelo e produtos de higiene pessoal à disposição.",
	},
];

function Faq() {
	return (
		<div className="mx-auto max-w-7xl my-24 px-6 lg:px-8 sm:my-56">
			<div className="mx-auto">
				<h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
					Perguntas Frequentes
				</h2>
				<dl className="mt-16 divide-y divide-gray-900/10">
					{faqs.map((faq) => (
						<Disclosure
							key={faq.question}
							as="div"
							className="py-6 first:pt-0 last:pb-0"
						>
							<dt>
								<DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
									<span className="text-base/7 font-semibold">
										{faq.question}
									</span>
									<span className="ml-6 flex h-7 items-center">
										<PlusIcon
											aria-hidden="true"
											className="size-6 group-data-open:hidden"
										/>
										<MinusIcon
											aria-hidden="true"
											className="size-6 group-not-data-open:hidden"
										/>
									</span>
								</DisclosureButton>
							</dt>
							<DisclosurePanel as="dd" className="mt-2 pr-12">
								<p className="text-base/7 text-gray-600">{faq.answer}</p>
							</DisclosurePanel>
						</Disclosure>
					))}
				</dl>
			</div>
		</div>
	);
}

export default Faq;
