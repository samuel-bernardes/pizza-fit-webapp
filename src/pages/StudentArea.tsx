import React, { useState, useEffect } from "react";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import AlunoRequest, {
	type IAcessosPorUnidade,
	type IAlunoModel,
	type IUpdateAlunoDTO,
} from "../services/endpoints/Aluno";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import type {
	IAcessoCreateModel,
	IAcessoModel,
	IAcessoUpdateModel,
} from "../services/endpoints/Acessos";
import AcessosRequest from "../services/endpoints/Acessos";
import {
	CreateAcessModal,
	DeleteUserModal,
	StudentHeader,
} from "../components";
import PlansTab from "../components/PlansTab";
import {
	formatarCPF,
	formatarData,
	formatarHora,
	formatarTelefone,
} from "../utils/FormatFunctions";

import Swal from "sweetalert2";

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

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [newAcesso, setNewAcesso] = useState<IAcessoCreateModel>({
		idAluno: user?.id || "",
		idUnidade: "",
		horaEntrada: new Date().toISOString().slice(0, 16), // Formato inicial
		horaSaida: null,
		descricaoAtividades: "",
	});

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
		createdAt: "",
		updatedAt: "",
	});

	const [acessos, setAcessos] = useState<IAcessoModel[]>([]);
	const [acessosLoading, setAcessosLoading] = useState(false);

	const [acessosPorUnidade, setAcessosPorUnidade] = useState<
		IAcessosPorUnidade[]
	>([]);

	const getStudent = async () => {
		try {
			setIsLoading(true);
			if (user) {
				const response = await AlunoRequest.GetAlunoById(user.id);

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
					Swal.fire({
						title: response.message || "Erro ao obter estudante!",
						icon: "error",
						draggable: true,
					});
				}
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
				Swal.fire({
					title: "Dados atualizados com sucesso!",
					icon: "success",
				});
			} else {
				Swal.fire({
					title: response.message || "Erro ao atualizar estudante!",
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
					Swal.fire({
						title: response.message || "Erro ao obter acessos!",
						icon: "error",
					});
				}
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
			});
		} finally {
			setAcessosLoading(false);
		}
	};

	const deleteStudent = async () => {
		try {
			const response = await AlunoRequest.DeleteAluno(user?.id || "");

			if (response.status === 200) {
				Swal.fire({
					title: "Conta deletada com sucesso!",
					icon: "success",
				});
				logout();
				navigate("/login");
			} else {
				Swal.fire({
					title: response.message || "Erro ao deletar conta!",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
			});
		} finally {
			setShowDeleteModal(false);
		}
	};

	const createAcesso = async () => {
		try {
			const response = await AcessosRequest.CreateAcesso({
				...newAcesso,
				idAluno: user?.id || "",
			});

			if (response.status === 201 && response.data) {
				setAcessos([response.data, ...acessos]);
				setShowCreateModal(false);
				setNewAcesso({
					idAluno: user?.id || "",
					idUnidade: newAcesso.idUnidade,
					descricaoAtividades: newAcesso.descricaoAtividades || "",
					horaEntrada: newAcesso.horaEntrada,
					horaSaida: newAcesso.horaSaida || "",
				});
				Swal.fire({
					title: "Acesso criado com sucesso!",
					icon: "success",
				});
			} else {
				Swal.fire({
					title: response.message || "Erro ao criar acesso!",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
			});
		}
	};

	const handleSaveDescricao = async (acessoId: string) => {
		if (!descricao.trim()) return;

		try {
			const acessoToUpdate = acessos.find((a) => a.id === acessoId);
			if (!acessoToUpdate) return;

			const updatedDescricao: IAcessoUpdateModel = {
				idAluno: user?.id || "",
				descricaoAtividades: descricao || "",
			};

			const response = await AcessosRequest.UpdateAcesso(
				acessoId,
				updatedDescricao
			);

			if (response.status === 200 && response.data) {
				setAcessos(
					acessos
						.map((a) => (a.id === acessoId ? response.data : a))
						.filter((a): a is IAcessoModel => a !== undefined)
				);
				setDescricao("");
				setActiveAcesso(null);
				Swal.fire({
					title: "Acesso atualizado com sucesso!",
					icon: "success",
				});
			} else {
				Swal.fire({
					title: response.message || "Erro ao atualizar acesso!",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
			});
		}
	};

	const getAcessosPorUnidade = async () => {
		try {
			const response = await AlunoRequest.GetAcessosPorUnidadeComMaisDeTres();

			if (response.status === 200 && response.data) {
				// Processar os dados conforme necessário
				setAcessosPorUnidade(response.data);
			} else {
				Swal.fire({
					title: response.message || "Erro ao obter acessos por unidade!",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Erro ao conectar com o servidor",
				icon: "error",
			});
		}
	};

	useEffect(() => {
		getStudent();
		getAcessos();
		getAcessosPorUnidade();
	}, [user]);

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
			<DeleteUserModal
				deleteStudent={deleteStudent}
				setShowDeleteModal={setShowDeleteModal}
				showDeleteModal={showDeleteModal}
			/>

			<CreateAcessModal
				createAcesso={createAcesso}
				newAcesso={newAcesso}
				setNewAcesso={setNewAcesso}
				showCreateModal={showCreateModal}
				setShowCreateModal={setShowCreateModal}
			/>

			<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
				{/* Cabeçalho com foto e nome */}
				<StudentHeader aluno={aluno} />

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
					{activeTab === "plano" && <PlansTab aluno={aluno} />}

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
										<div className="px-6 py-4 border-b border-gray-200">
											<h3 className="text-lg font-medium text-gray-900">
												Acessos por Unidade
											</h3>
											<p className="mt-1 text-sm text-gray-500">
												Visão consolidada dos acessos dos alunos por unidade
											</p>
										</div>

										<div className="overflow-x-auto">
											<table className="min-w-full divide-y divide-gray-200">
												<thead className="bg-gray-50">
													<tr>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
															Aluno
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
															Unidade
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
															Acessos
														</th>
														<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
															Status
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													{acessosPorUnidade.map((item) => (
														<tr
															key={`${item.alunoId}-${item.unidadeId}`}
															className="hover:bg-gray-50"
														>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="flex items-center">
																	<div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
																		<span className="text-blue-600 font-medium">
																			{item.alunoNome.charAt(0).toUpperCase()}
																		</span>
																	</div>
																	<div className="ml-4">
																		<div className="text-sm font-medium text-gray-900">
																			{item.alunoNome}
																		</div>
																	</div>
																</div>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="text-sm text-gray-900 font-medium">
																	{item.unidadeNome}
																</div>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="text-center">
																	<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																		{item.totalAcessos} acessos
																	</span>
																</div>
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="text-sm text-gray-500">
																	{item.totalAcessos > 10 ? (
																		<span className="flex items-center">
																			<span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
																			Frequente
																		</span>
																	) : item.totalAcessos > 0 ? (
																		<span className="flex items-center">
																			<span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
																			Moderado
																		</span>
																	) : (
																		<span className="flex items-center">
																			<span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
																			Sem acessos
																		</span>
																	)}
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>

										{acessosPorUnidade.length === 0 && (
											<div className="px-6 py-12 text-center">
												<div className="text-gray-400 text-sm">
													Nenhum registro encontrado
												</div>
											</div>
										)}
									</div>
									<div className="bg-white shadow rounded-lg overflow-hidden">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Entrada
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Saída
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Unidade
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
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{formatarData(acesso.horaEntrada) +
																"-" +
																formatarHora(acesso.horaEntrada)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{acesso.horaSaida
																? formatarData(acesso.horaSaida) +
																  "-" +
																  formatarHora(acesso.horaSaida)
																: "Em andamento"}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{acesso.nomeUnidade || "Não informado"}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{acesso.descricaoAtividades || "Não informado"}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															{acesso.horaSaida && (
																<button
																	onClick={() => {
																		setActiveAcesso(
																			acesso.id === activeAcesso
																				? null
																				: acesso.id
																		);
																		setDescricao(
																			acesso.descricaoAtividades || ""
																		);
																	}}
																	className="text-yellow-600 hover:text-yellow-900"
																>
																	{activeAcesso === acesso.id
																		? "Cancelar"
																		: "Editar descrição"}
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
											onClick={() => setShowCreateModal(true)}
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
												Editar descrição de atividades
											</h3>
											<textarea
												rows={3}
												value={descricao}
												onChange={(e) => setDescricao(e.target.value)}
												placeholder="Descreva as atividades realizadas neste acesso"
												className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
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
