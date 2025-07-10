import { RegisterForm } from "../components";
import { useNavigate } from "react-router";
import { logo } from "../assets";

function Register() {
	const navigate = useNavigate();

	return (
		<div className="bg-gray-50 min-h-screen">
			<main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				{/* Header Section */}
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

				{/* Progress Steps (optional) */}
				{/* <div className="mb-10 px-4 sm:px-0">
					<div className="flex items-center justify-center">
						<div className="flex items-center text-yellow-600">
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
								<span className="font-medium">1</span>
							</div>
							<div className="ml-2 text-sm font-medium">
								Informações Pessoais
							</div>
						</div>
						<div className="flex-auto border-t-2 border-gray-200 mx-4"></div>
						<div className="flex items-center text-gray-500">
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
								<span className="font-medium">2</span>
							</div>
							<div className="ml-2 text-sm font-medium">Plano de Treino</div>
						</div>
					</div>
				</div>
 */}
				{/* Form Container */}
				<div className="bg-white shadow-lg rounded-2xl overflow-hidden">
					<div className="p-6 sm:p-8 md:p-10">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Registro de Conta
						</h2>
						<RegisterForm />
					</div>

					{/* Footer Note */}
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

				{/* Trust Signals */}
				{/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div className="p-4">
						<div className="text-yellow-600 text-2xl font-bold">2K+</div>
						<div className="text-gray-600 text-sm">Alunos Ativos</div>
					</div>
					<div className="p-4">
						<div className="text-yellow-600 text-2xl font-bold">15+</div>
						<div className="text-gray-600 text-sm">Professores</div>
					</div>
					<div className="p-4">
						<div className="text-yellow-600 text-2xl font-bold">10+</div>
						<div className="text-gray-600 text-sm">Modalidades</div>
					</div>
					<div className="p-4">
						<div className="text-yellow-600 text-2xl font-bold">24/7</div>
						<div className="text-gray-600 text-sm">Atendimento</div>
					</div>
				</div> */}
			</main>
		</div>
	);
}

export default Register;
