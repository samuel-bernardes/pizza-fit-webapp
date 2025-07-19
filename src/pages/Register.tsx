import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { logo } from "../assets";
import AlunoRequest from "../services/endpoints/Aluno";

interface IFormData {
	nome: string;
	email: string;
	senha: string;
	cpf: string;
	telefone: string;
	endereco: string;
	dataNasc: string;
	foto: string;
}

function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<IFormData>({
		nome: "",
		email: "",
		senha: "",
		cpf: "",
		telefone: "",
		endereco: "",
		dataNasc: "",
		foto: "",
	});
	const [previewUrl, setPreviewUrl] = useState(""); // URL temporária para pré-visualização
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Criar URL temporária para pré-visualização
			const previewURL = URL.createObjectURL(file);
			setPreviewUrl(previewURL);

			// Converter para base64 para envio
			const base64 = await convertToBase64(file);
			setFormData((prev) => ({ ...prev, foto: base64 }));
		}
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleRemoveImage = () => {
		setPreviewUrl("");
		setFormData((prev) => ({ ...prev, foto: "" }));

		// Resetar o input de arquivo
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await AlunoRequest.CreateAluno(formData);

			if (response.status === 201) {
				navigate("/login", { state: { success: true } });
			} else {
				alert(response.message || "Erro ao criar conta");
			}
		} catch (error) {
			console.error("Erro na requisição:", error);
			alert("Erro ao conectar com o servidor");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			<main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				<div className="text-center mb-10">
					<img
						onClick={() => navigate("/")}
						alt="Pizza Fit"
						src={logo}
						className="mx-auto h-32 w-auto mb-8 cursor-pointer"
					/>

					<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
						Junte-se à <span className="text-yellow-600">Pizza Fit</span>
					</h1>
					<p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
						Crie sua conta e comece sua jornada fitness hoje mesmo
					</p>
				</div>

				<div className="bg-white shadow-lg rounded-2xl overflow-hidden">
					<div className="p-6 sm:p-8 md:p-10">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Registro de Conta
						</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
								<div className="sm:col-span-6">
									<label
										htmlFor="nome"
										className="block text-sm font-medium text-gray-700"
									>
										Nome Completo
									</label>
									<input
										type="text"
										name="nome"
										id="nome"
										value={formData.nome}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								{/* Email */}
								<div className="sm:col-span-6">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								{/* Senha */}
								<div className="sm:col-span-6">
									<label
										htmlFor="senha"
										className="block text-sm font-medium text-gray-700"
									>
										Senha
									</label>
									<input
										type="password"
										name="senha"
										id="senha"
										value={formData.senha}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								{/* CPF e Telefone */}
								<div className="sm:col-span-3">
									<label
										htmlFor="cpf"
										className="block text-sm font-medium text-gray-700"
									>
										CPF
									</label>
									<input
										type="text"
										name="cpf"
										id="cpf"
										value={formData.cpf}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="telefone"
										className="block text-sm font-medium text-gray-700"
									>
										Telefone
									</label>
									<input
										type="text"
										name="telefone"
										id="telefone"
										value={formData.telefone}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								{/* Endereço */}
								<div className="sm:col-span-6">
									<label
										htmlFor="endereco"
										className="block text-sm font-medium text-gray-700"
									>
										Endereço
									</label>
									<input
										type="text"
										name="endereco"
										id="endereco"
										value={formData.endereco}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								{/* Data de Nascimento e Foto */}
								<div className="sm:col-span-3">
									<label
										htmlFor="dataNasc"
										className="block text-sm font-medium text-gray-700"
									>
										Data de Nascimento
									</label>
									<input
										type="date"
										name="dataNasc"
										id="dataNasc"
										value={formData.dataNasc}
										onChange={handleInputChange}
										required
										className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
									/>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="foto"
										className="block text-sm font-medium text-gray-700"
									>
										Foto de Perfil
									</label>
									<input
										ref={fileInputRef}
										type="file"
										name="foto"
										id="foto"
										accept="image/*"
										onChange={handleFileChange}
										className="mt-1 py-2 px-4 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-yellow-50 file:text-yellow-700
                      hover:file:bg-yellow-100"
									/>

									{/* Pré-visualização da imagem */}
									{previewUrl && (
										<div className="mt-4">
											<p className="text-sm text-gray-500 mb-1">
												Pré-visualização:
											</p>
											<div className="relative inline-block">
												<img
													src={previewUrl}
													alt="Pré-visualização"
													className="w-32 h-32 object-cover rounded-lg border border-gray-200"
												/>
												<button
													type="button"
													onClick={handleRemoveImage}
													className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 focus:outline-none"
													aria-label="Remover imagem"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-4 w-4 text-white"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
								>
									{isLoading ? (
										<span className="flex items-center">
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
											Processando...
										</span>
									) : (
										"Criar Conta"
									)}
								</button>
							</div>
						</form>
					</div>

					<div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
						<p className="text-sm text-gray-600 text-center">
							Já tem uma conta?{" "}
							<span
								onClick={() => navigate("/login")}
								className="font-medium cursor-pointer text-yellow-600 hover:text-yellow-500"
							>
								Faça login aqui
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Register;
