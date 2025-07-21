import { useNavigate } from "react-router";
import { logo } from "../assets";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type { ILoginCredentials } from "../services/endpoints/Auth";
import AuthRequest from "../services/endpoints/Auth";
import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2";

function Login() {
	const navigate = useNavigate();
	const { login } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [formData, setFormData] = useState<ILoginCredentials>({
		email: "",
		senha: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			const response = await AuthRequest.DoLogin(formData);

			if (response.status === 200 && response.data) {
				login(response.data.aluno, response.data.token);
				navigate("/perfil", { state: { success: true } });
				Swal.fire({
					title: "Login efetuado com sucesso!",
					icon: "success",
				});
			} else {
				setError(response.message || "Erro ao realizar login!");
			}
		} catch (error) {
			setError("Erro ao realizar login! Verifique suas credenciais.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-50">
			<div className="w-full max-w-md mx-auto">
				<div className="text-center">
					<img
						onClick={() => navigate("/")}
						alt="Pizza Fit"
						src={logo}
						className="mx-auto h-32 w-auto mb-8 cursor-pointer"
					/>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						Acesse sua conta
					</h2>
					<p className="text-gray-600 mb-8">
						Entre para acompanhar seus treinos e resultados
					</p>
				</div>

				<div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
					{/* Exibição de erro */}
					{error && (
						<div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
							{error}
						</div>
					)}

					<form className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
								placeholder="seu@email.com"
								disabled={isLoading}
							/>
						</div>

						<div>
							<div className="flex justify-between items-center mb-1">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Senha
								</label>
								<a
									href="#"
									className="text-sm font-medium text-yellow-600 hover:text-yellow-500"
								>
									Esqueceu a senha?
								</a>
							</div>
							<input
								id="password"
								name="senha"
								type="password"
								value={formData.senha}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
								placeholder="••••••••"
								disabled={isLoading}
							/>
						</div>

						<button
							onClick={handleSubmit}
							type="submit"
							disabled={isLoading}
							className={`w-full py-2 px-4 ${
								isLoading
									? "bg-yellow-400"
									: "bg-yellow-600 hover:bg-yellow-500"
							} text-white font-medium rounded-md transition duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 flex justify-center items-center`}
						>
							{isLoading ? (
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
									Processando...
								</>
							) : (
								"Entrar"
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Ainda não é membro?{" "}
							<span
								onClick={() => !isLoading && navigate("/registro")}
								className={`font-medium ${
									isLoading
										? "text-yellow-400 cursor-not-allowed"
										: "text-yellow-600 hover:text-yellow-500 cursor-pointer"
								}`}
							>
								Crie sua conta
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
