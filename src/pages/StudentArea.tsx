import React, { useState } from "react";
import {
	UserCircleIcon,
	ClockIcon,
	CalendarIcon,
	PencilIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";

export interface AcessoModel {
	id: string;
	horaEntrada: string;
	horaSaida?: string;
	idAluno: string;
	idUnidade: string;
	descricaoAtividades?: string;
	nomeUnidade: string;
}

export interface AlunoModel {
	id: string;
	nome: string;
	email: string;
	dataNasc: string;
	endereco: string;
	status: string;
	plano: PlanoModel;
	foto?: string;
	telefone?: string;
}

export interface PlanoModel {
	nome: string;
	dataInicio: string;
	dataFim: string;
	preco: string;
	beneficios: string[];
}

function StudentArea() {
	const [activeTab, setActiveTab] = useState("informacoes");
	const [editMode, setEditMode] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [activeAcesso, setActiveAcesso] = useState<string | null>(null);

	// Dados mockados do aluno
	const [aluno, setAluno] = useState<AlunoModel>({
		id: "1",
		nome: "João Silva",
		email: "joao@email.com",
		dataNasc: "1995-05-15",
		endereco: "Av. Paulista, 1000 - São Paulo/SP",
		status: "Ativo",
		telefone: "(11) 99999-9999",
        foto: "https://wallpapers.com/images/hd/cute-anime-profile-pictures-0lifptfs0jd9fml3.jpg",
		plano: {
			nome: "Plano Premium",
			dataInicio: "2023-01-15",
			dataFim: "2024-01-14",
			preco: "R$199/mês",
			beneficios: [
				"Acesso 24 horas",
				"Aulas ilimitadas",
				"Personal trainer 2x/semana",
				"Avaliação física mensal",
			],
		},
	});

	// Dados mockados de acessos
	const [acessos, setAcessos] = useState<AcessoModel[]>([
		{
			id: "1",
			horaEntrada: "2023-10-15T08:30:00",
			horaSaida: "2023-10-15T10:15:00",
			idAluno: "1",
			idUnidade: "centro",
			nomeUnidade: "Pizza Fit Centro",
			descricaoAtividades: "Musculação - Peito e Tríceps",
		},
		{
			id: "2",
			horaEntrada: "2023-10-17T18:00:00",
			horaSaida: "2023-10-17T19:30:00",
			idAluno: "1",
			idUnidade: "sul",
			nomeUnidade: "Pizza Fit Zona Sul",
			descricaoAtividades: "Aula de Spinning",
		},
		{
			id: "3",
			horaEntrada: "2023-10-20T07:45:00",
			idAluno: "1",
			idUnidade: "centro",
			nomeUnidade: "Pizza Fit Centro",
		},
	]);

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

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
							<div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-700 text-yellow-100">
								<CheckCircleIcon className="h-4 w-4 mr-1" />
								{aluno.status}
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
								<button
									onClick={() => setEditMode(!editMode)}
									className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none"
								>
									<PencilIcon className="h-4 w-4 mr-1" />
									{editMode ? "Cancelar" : "Editar"}
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Nome Completo
									</label>
									{editMode ? (
										<input
											type="text"
											value={aluno.nome}
											onChange={(e) =>
												setAluno({ ...aluno, nome: e.target.value })
											}
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
											value={aluno.email}
											onChange={(e) =>
												setAluno({ ...aluno, email: e.target.value })
											}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">{aluno.email}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Data de Nascimento
									</label>
									{editMode ? (
										<input
											type="date"
											value={aluno.dataNasc}
											onChange={(e) =>
												setAluno({ ...aluno, dataNasc: e.target.value })
											}
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
											value={aluno.telefone || ""}
											onChange={(e) =>
												setAluno({ ...aluno, telefone: e.target.value })
											}
											placeholder="(00) 00000-0000"
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">
											{aluno.telefone || "Não informado"}
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
											value={aluno.endereco}
											onChange={(e) =>
												setAluno({ ...aluno, endereco: e.target.value })
											}
											className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									) : (
										<p className="text-gray-900">{aluno.endereco}</p>
									)}
								</div>
							</div>

							{editMode && (
								<div className="mt-8 flex justify-end">
									<button
										onClick={() => {
											// Aqui iria a lógica para salvar no backend
											setEditMode(false);
										}}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
									>
										Salvar Alterações
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

							<div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
								<div className="flex flex-col md:flex-row md:items-center md:justify-between">
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{aluno.plano.nome}
										</h3>
										<p className="mt-1 text-yellow-700 font-medium">
											{aluno.plano.preco}
										</p>
									</div>
									<div className="mt-4 md:mt-0">
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
											<CalendarIcon className="h-4 w-4 mr-1" />
											Válido até: {formatarData(aluno.plano.dataFim)}
										</span>
									</div>
								</div>

								<div className="mt-6">
									<h4 className="text-sm font-medium text-gray-700 mb-2">
										Benefícios inclusos:
									</h4>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
										{aluno.plano.beneficios.map((beneficio, index) => (
											<li key={index} className="flex items-start">
												<CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700">{beneficio}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="mt-8 pt-6 border-t border-yellow-200">
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Período do plano:
									</h4>
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-600">
											Início: {formatarData(aluno.plano.dataInicio)}
										</span>
										<span className="text-sm text-gray-600">
											Término: {formatarData(aluno.plano.dataFim)}
										</span>
									</div>
								</div>
							</div>

							<div className="mt-8 bg-gray-50 rounded-lg p-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Histórico de Pagamentos
								</h3>
								<p className="text-gray-500 text-sm">
									Seu histórico de pagamentos estará disponível em breve.
								</p>
							</div>
						</div>
					)}

					{/* Tab Acessos */}
					{activeTab === "acessos" && (
						<div>
							<h2 className="text-xl font-bold text-gray-900 mb-6">
								Meus Acessos
							</h2>

							<div className="bg-white shadow rounded-lg overflow-hidden">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Unidade
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Data
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Entrada
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Saída
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Atividades
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Ações
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{acessos.map((acesso) => (
											<tr key={acesso.id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm font-medium text-gray-900">
														{acesso.nomeUnidade}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-500">
														{formatarData(acesso.horaEntrada)}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{formatarHora(acesso.horaEntrada)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{acesso.horaSaida
														? formatarHora(acesso.horaSaida)
														: "Em andamento"}
												</td>
												<td className="px-6 py-4 text-sm text-gray-500">
													{acesso.descricaoAtividades || "Não informado"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													{acesso.horaSaida && (
														<button
															onClick={() => {
																setActiveAcesso(
																	acesso.id === activeAcesso ? null : acesso.id
																);
																setDescricao(acesso.descricaoAtividades || "");
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

							{/* Formulário para adicionar descrição */}
							{activeAcesso && (
								<div className="mt-8 bg-gray-50 rounded-lg p-6">
									<h3 className="text-lg font-medium text-gray-900 mb-4">
										Adicionar descrição de atividades
									</h3>
									<textarea
										rows={3}
										value={descricao}
										onChange={(e) => setDescricao(e.target.value)}
										placeholder="Descreva as atividades realizadas neste acesso (ex: Musculação - Costas e Bíceps, 30min de esteira)"
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

							{acessos.length === 0 && (
								<div className="text-center py-12">
									<ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
									<h3 className="mt-2 text-sm font-medium text-gray-900">
										Nenhum acesso registrado
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										Seus acessos à academia aparecerão aqui quando você fizer
										check-in.
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default StudentArea;
