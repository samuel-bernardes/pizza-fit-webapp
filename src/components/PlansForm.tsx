import { CheckIcon } from "@heroicons/react/16/solid";
import PlanosRequest, { type IPlanoModel } from "../services/endpoints/Planos";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

function PlansForm() {
	const [planos, setPlanos] = useState<IPlanoModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const { user, logout } = useUserContext();

	const getPlanos = async () => {
		try {
			setIsLoading(true);
			const response = await PlanosRequest.GetPlanos();

			if (response.status === 200 && response.data) {
				setPlanos(response.data);
			} else {
				Swal.fire({
					title: response.message || "Erro ao obter planos!",
					icon: "error",
					draggable: true,
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
				draggable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPlanos();
	}, []);

	const handlePlanoSelect = async (planoId: string) => {
		try {
			// Verifica se o usuário está logado
			if (!user) {
				Swal.fire({
					title: "Acesso não autorizado",
					text: "Você precisa estar logado para selecionar um plano",
					icon: "warning",
					showConfirmButton: true,
					confirmButtonText: "Fazer login",
					showCancelButton: true,
					cancelButtonText: "Cancelar",
					draggable: true,
				}).then((result) => {
					if (result.isConfirmed) {
						// Redirecionar para a página de login
						window.location.href = "/login"; // Ou usar navigate se estiver usando react-router
					}
				});
				return;
			}

			setIsLoading(true);

			const response = await PlanosRequest.SetPlanoDoAluno({
				planoId: planoId,
			});

			if (response.status === 200 && response.data) {
				Swal.fire({
					title: "Plano associado com sucesso!",
					text: `Você agora está no plano ${
						response.data.plano?.nome || "selecionado"
					}`,
					icon: "success",
					showConfirmButton: true,
					timer: 3000,
					draggable: true,
				});
			} else {
				Swal.fire({
					title: response.message || "Erro ao associar plano",
					text: "Por favor, tente novamente mais tarde",
					icon: "error",
					draggable: true,
				});
			}
		} catch (error: any) {
			console.error("Erro ao selecionar plano:", error);

			Swal.fire({
				title: "Erro ao processar solicitação",
				text:
					error.response?.data?.message ||
					error.message ||
					"Ocorreu um erro inesperado",
				icon: "error",
				draggable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
			</div>
		);
	}

	return (
		<div className="py-24 sm:py-32 bg-gray-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-base/7 font-semibold text-yellow-600">
						Nossos Planos
					</h1>
					<p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
						Encontre o plano perfeito para você
					</p>
				</div>
				<p className="mx-auto max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 mt-4">
					Escolha entre nossos planos cuidadosamente elaborados para atender às
					suas necessidades.
				</p>

				<div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
					{planos.map((plano, index) => (
						<div
							key={plano.id}
							className={`rounded-3xl p-8 ring-1 ring-gray-300 bg-white hover:shadow-lg transition-all ${
								index === 1 ? "ring-2 ring-yellow-600 scale-105" : ""
							}`}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3 className="text-2xl font-bold text-gray-900">
									{plano.nome}
								</h3>
								{index === 1 && (
									<span className="rounded-full bg-yellow-600/10 px-3 py-1 text-xs font-semibold text-yellow-600">
										Popular
									</span>
								)}
							</div>

							<p className="mt-6 text-4xl font-bold tracking-tight text-yellow-600">
								R$: {plano.preco}
							</p>

							<p className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
								{plano.duracao}
							</p>

							<p className="mt-4 text-sm text-gray-600">{plano.descricao}</p>

							<button
								onClick={() => handlePlanoSelect(plano.id)}
								className={`mt-8 block w-full rounded-md px-3 py-3 text-center font-semibold ${
									index === 1
										? "bg-yellow-600 text-white hover:bg-yellow-700"
										: "text-yellow-600 ring-1 ring-yellow-200 hover:ring-yellow-300"
								}`}
							>
								Assinar Plano
							</button>
						</div>
					))}
				</div>

				{planos.length === 0 && !isLoading && (
					<div className="mt-12 text-center py-12">
						<p className="text-gray-500">Nenhum plano disponível no momento</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default PlansForm;
