import React, { useState, useEffect } from "react";
import {
	ClockIcon,
	CalendarIcon,
	PencilIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";
import AlunoRequest, {
	type IAlunoModel,
	type IUpdateAlunoDTO,
} from "../services/endpoints/Aluno";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import {
	ExclamationTriangleIcon,
	PlusCircleIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import type { IAcessoModel } from "../services/endpoints/Acessos";
import AcessosRequest from "../services/endpoints/Acessos";

function StudentArea() {
	const [activeTab, setActiveTab] = useState("informacoes");
	const [editMode, setEditMode] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [activeAcesso, setActiveAcesso] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [updateLoading, setUpdateLoading] = useState(false);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [alunoData, setAlunoData] = useState<IUpdateAlunoDTO>({
		nome: "",
		email: "",
		telefone: "",
		endereco: "",
		dataNasc: "",
		foto: "",
	});

	const { user, logout } = useUserContext();
	const navigate = useNavigate();

	const [aluno, setAluno] = useState<IAlunoModel>({
		id: "",
		nome: "",
		email: "",
		cpf: "",
		telefone: "",
		endereco: "",
		dataNasc: "",
		status: "",
		foto: "",
		idPlano: null,
		created_at: "",
		updated_at: "",
	});

	const [acessos, setAcessos] = useState<IAcessoModel[]>([]);
	const [acessosLoading, setAcessosLoading] = useState(false);

	const formatarData = (data: string) => {
		return new Date(data).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const formatarHora = (data: string) => {
		return new Date(data).toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatarCPF = (cpf: string) => {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	};

	const formatarTelefone = (telefone: string) => {
		return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
	};

	const getStudent = async () => {
		try {
			setIsLoading(true);
			if (user) {
				const response = await AlunoRequest.GetAlunoById(user.id);

				console.log("	Response:", response);

				if (response.status === 200 && response.data) {
					setAluno(response.data);
					setAlunoData({
						nome: response.data.nome,
						email: response.data.email,
						telefone: response.data.telefone,
						endereco: response.data.endereco,
						dataNasc: response.data.dataNasc.split("T")[0],
						foto: response.data.foto,
					});
				} else {
					alert(response.message || "Erro ao obter estudante!");
				}
			}
		} catch (error) {
			console.log(error);
			alert("Erro ao conectar com o servidor");
		} finally {
			setIsLoading(false);
		}
	};

	const updateStudent = async () => {
		try {
			setUpdateLoading(true);
			const response = await AlunoRequest.UpdateAluno(
				alunoData,
				user?.id || ""
			);

			if (response.status === 200 && response.data) {
				setAluno(response.data);
				setEditMode(false);
				alert("Dados atualizados com sucesso!");
			} else {
				alert(response.message || "Erro ao atualizar estudante!");
			}
		} catch (error) {
			alert("Erro ao conectar com o servidor");
		} finally {
			setUpdateLoading(false);
		}
	};

	const getAcessos = async () => {
		try {
			setAcessosLoading(true);
			if (user) {
				const response = await AcessosRequest.GetAcessosByAlunoId(user.id);

				if (response.status === 200 && response.data) {
					setAcessos(response.data);
				} else {
					alert(response.message || "Erro ao obter acessos!");
				}
			}
		} catch (error) {
			alert("Erro ao conectar com o servidor");
		} finally {
			setAcessosLoading(false);
		}
	};

	const deleteStudent = async () => {
		try {
			const response = await AlunoRequest.DeleteAluno(user?.id || "");

			if (response.status === 200) {
				alert("Conta deletada com sucesso!");
				logout();
				navigate("/login");
			} else {
				alert(response.message || "Erro ao deletar conta!");
			}
		} catch (error) {
			alert("Erro ao conectar com o servidor");
		} finally {
			setShowDeleteModal(false);
		}
	};

	useEffect(() => {
		getStudent();
		getAcessos();
	}, [user]);

	const handleSaveDescricao = (acessoId: string) => {
		if (!descricao.trim()) return;

		setAcessos(
			acessos.map((a) =>
				a.id === acessoId ? { ...a, descricaoAtividades: descricao } : a
			)
		);

		setDescricao("");
		setActiveAcesso(null);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAlunoData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<Dialog
				open={showDeleteModal}
				onClose={setShowDeleteModal}
				className="relative z-10"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<DialogPanel
							transition
							className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
						>
							<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
								<button
									type="button"
									onClick={() => setShowDeleteModal(false)}
									className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
								>
									<XMarkIcon aria-hidden="true" className="size-6" />
								</button>
							</div>
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
									<ExclamationTriangleIcon
										aria-hidden="true"
										className="size-6 text-red-600"
									/>
								</div>
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<DialogTitle
										as="h3"
										className="text-base font-semibold text-gray-900"
									>
										Deletar Conta
									</DialogTitle>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Tem certeza que deseja deletar sua conta? Todos os seus
											dados serão permanentemente removidos. Esta ação não pode
											ser desfeita!
										</p>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									onClick={() => deleteStudent()}
									className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
								>
									Deletar
								</button>
								<button
									type="button"
									onClick={() => setShowDeleteModal(false)}
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>
									Cancelar
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>

			<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
				{/* Cabeçalho com foto e nome */}
				<div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row items-center">
						<div className="mb-6 sm:mb-0 sm:mr-6 relative group">
							<div className="relative">
								{aluno.foto ? (
									<img
										src={aluno.foto}
										alt={`Foto de ${aluno.nome}`}
										className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
									/>
								) : (
									<div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-32 h-32 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
										<span className="text-white text-4xl font-bold">
											{aluno.nome.charAt(0).toUpperCase()}
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="text-center sm:text-left">
							<h1 className="text-2xl sm:text-3xl font-bold text-white">
								{aluno.nome}
							</h1>
							<p className="mt-1 text-yellow-100">{aluno.email}</p>
							<div className="flex flex-wrap gap-2 mt-2">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-700 text-yellow-100">
									<CheckCircleIcon className="h-4 w-4 mr-1" />
									{aluno.status === "ativo" ? "Ativo" : "Inativo"}
								</span>
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-700 text-yellow-100">
									<CalendarIcon className="h-4 w-4 mr-1" />
									Ativo desde: {formatarData(aluno.created_at)}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Abas de navegação */}
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
						{[
							{ name: "Informações", key: "informacoes" },
							{ name: "Meu Plano", key: "plano" },
							{ name: "Meus Acessos", key: "acessos" },
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setActiveTab(tab.key)}
								className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
									activeTab === tab.key
										? "border-yellow-500 text-yellow-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								{tab.name}
							</button>
						))}
					</nav>
				</div>

				{/* Conteúdo das abas */}
				<div className="p-6 sm:p-8">
					{/* Tab Informações */}
					{activeTab === "informacoes" && (
						<div>
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-bold text-gray-900">
									Informações Pessoais
								</h2>
								<div className="flex gap-2">
									<button
										onClick={() => setShowDeleteModal(true)}
										className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
									>
										<TrashIcon className="h-4 w-4 mr-1" />
										Deletar
									</button>
									<button
										onClick={() => setEditMode(!editMode)}
										className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none"
									>
										<PencilIcon className="h-4 w-4 mr-1" />
										{editMode ? "Cancelar" : "Editar"}
									</button>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Nome Completo
									</label>
									{editMode ? (
										<input
											type="text"
											name="nome"
											value={alunoData.nome}
											onChange={handleInputChange}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">{aluno.nome}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Email
									</label>
									{editMode ? (
										<input
											type="email"
											name="email"
											value={alunoData.email}
											onChange={handleInputChange}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">{aluno.email}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										CPF
									</label>
									<p className="text-gray-900">{formatarCPF(aluno.cpf)}</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Data de Nascimento
									</label>
									{editMode ? (
										<input
											type="date"
											name="dataNasc"
											value={alunoData.dataNasc}
											onChange={handleInputChange}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">
											{formatarData(aluno.dataNasc)}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Telefone
									</label>
									{editMode ? (
										<input
											type="tel"
											name="telefone"
											value={alunoData.telefone}
											onChange={handleInputChange}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">
											{formatarTelefone(aluno.telefone)}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Endereço
									</label>
									{editMode ? (
										<input
											type="text"
											name="endereco"
											value={alunoData.endereco}
											onChange={handleInputChange}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">{aluno.endereco}</p>
									)}
								</div>
							</div>

							{editMode && (
								<div className="mt-8 flex justify-end space-x-3">
									<button
										onClick={() => {
											setEditMode(false);
											setAlunoData({
												nome: aluno.nome,
												email: aluno.email,
												telefone: aluno.telefone,
												endereco: aluno.endereco,
												dataNasc: aluno.dataNasc.split("T")[0],
												foto: aluno.foto,
											});
										}}
										className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
									>
										Cancelar
									</button>
									<button
										onClick={updateStudent}
										disabled={updateLoading}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none disabled:opacity-50"
									>
										{updateLoading ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Salvando...
											</>
										) : (
											"Salvar Alterações"
										)}
									</button>
								</div>
							)}
						</div>
					)}

					{/* Tab Plano */}
					{activeTab === "plano" && (
						<div>
							<h2 className="text-xl font-bold text-gray-900 mb-6">
								Meu Plano
							</h2>

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
					)}

					{/* Tab Acessos */}
					{activeTab === "acessos" && (
						<div>
							<h2 className="text-xl font-bold text-gray-900 mb-6">
								Meus Acessos
							</h2>

							{acessosLoading ? (
								<div className="flex justify-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
								</div>
							) : (
								<>
									<div className="bg-white shadow rounded-lg overflow-hidden">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Data
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Entrada
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Saída
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Atividades
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Ações
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{acessos.map((acesso) => (
													<tr key={acesso.id} className="hover:bg-gray-50">
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="text-sm text-gray-500">
																{formatarData(acesso.hora_entrada)}
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{formatarHora(acesso.hora_entrada)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{acesso.hora_saida
																? formatarHora(acesso.hora_saida)
																: "Em andamento"}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{acesso.descricao_atividade || "Não informado"}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															{acesso.hora_saida && (
																<button
																	onClick={() => {
																		setActiveAcesso(
																			acesso.id === activeAcesso
																				? null
																				: acesso.id
																		);
																		setDescricao(
																			acesso.descricao_atividade || ""
																		);
																	}}
																	className="text-yellow-600 hover:text-yellow-900"
																>
																	{activeAcesso === acesso.id
																		? "Cancelar"
																		: "Adicionar descrição"}
																</button>
															)}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									<div className="mt-6 flex justify-center">
										<button
											onClick={() => getAcessos()}
											className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
										>
											<PlusCircleIcon className="h-5 w-5 mr-2" />
											Criar Acesso
										</button>
									</div>

									{acessos.length === 0 && (
										<div className="text-center py-12">
											<ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
											<h3 className="mt-2 text-sm font-medium text-gray-900">
												Nenhum acesso registrado
											</h3>
											<p className="mt-1 text-sm text-gray-500">
												Seus acessos à academia aparecerão aqui quando você
												fizer check-in.
											</p>
										</div>
									)}

									{activeAcesso && (
										<div className="mt-8 bg-gray-50 rounded-lg p-6">
											<h3 className="text-lg font-medium text-gray-900 mb-4">
												Adicionar descrição de atividades
											</h3>
											<textarea
												rows={3}
												value={descricao}
												onChange={(e) => setDescricao(e.target.value)}
												placeholder="Descreva as atividades realizadas neste acesso"
												className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
											/>
											<div className="mt-4 flex justify-end space-x-3">
												<button
													onClick={() => setActiveAcesso(null)}
													className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
												>
													Cancelar
												</button>
												<button
													onClick={() => handleSaveDescricao(activeAcesso)}
													className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
												>
													Salvar Descrição
												</button>
											</div>
										</div>
									)}
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default StudentArea;
