import { useNavigate } from "react-router";
import { logo } from "../assets";

function Login() {
	const navigate = useNavigate();

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
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
								placeholder="seu@email.com"
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
								name="password"
								type="password"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-md transition duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
						>
							Entrar
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Ainda não é membro?{" "}
							<span
								onClick={() => navigate("/registro")}
								className="font-medium text-yellow-600 hover:text-yellow-500 cursor-pointer"
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
