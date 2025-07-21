import { useNavigate } from "react-router";
import type { IAlunoModel } from "../services/endpoints/Aluno";

interface IPlansTabProps {
	aluno: IAlunoModel;
}

function PlansTab(props: IPlansTabProps) {
	const { aluno } = props;

	const navigate = useNavigate();

	return (
		<div>
			<h2 className="text-xl font-bold text-gray-900 mb-6">Meu Plano</h2>

			{aluno.plano ? (
				<div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								{aluno.plano.nome}
							</h3>
							<p className="mt-1 text-yellow-700 font-medium">
								Duração: {aluno.plano.duracao}
							</p>
						</div>
					</div>

					<div className="mt-6">
						<h4 className="text-sm font-medium text-gray-700 mb-2">
							Descrição do Plano:
						</h4>
						<p className="text-gray-700">{aluno.plano.descricao}</p>
					</div>
				</div>
			) : (
				<div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Você não possui um plano ativo
					</h3>
					<p className="text-gray-600 mb-4">
						Adquira um plano para começar a usar a academia
					</p>
					<button
						onClick={() => navigate("/planos")}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
					>
						Ver Planos Disponíveis
					</button>
				</div>
			)}
		</div>
	);
}

export default PlansTab;
