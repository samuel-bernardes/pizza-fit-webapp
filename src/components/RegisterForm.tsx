import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/16/solid";
function RegisterForm() {
	return (
		<form className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
			<div className="space-y-12">
				{/* Personal Information Section */}
				<div className="border-b border-gray-200 pb-12">
					<h2 className="text-xl font-semibold text-gray-900">
						Informações Pessoais
					</h2>
					<p className="mt-1 text-sm text-gray-600">
						Preencha seus dados para criar sua conta na Pizza Fit.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="nome"
								className="block text-sm font-medium text-gray-700"
							>
								Nome Completo*
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="nome"
									id="nome"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="cpf"
								className="block text-sm font-medium text-gray-700"
							>
								CPF*
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="cpf"
									id="cpf"
									required
									placeholder="000.000.000-00"
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email*
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="dataNasc"
								className="block text-sm font-medium text-gray-700"
							>
								Data de Nascimento*
							</label>
							<div className="mt-2">
								<input
									type="date"
									name="dataNasc"
									id="dataNasc"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="telefone"
								className="block text-sm font-medium text-gray-700"
							>
								Telefone
							</label>
							<div className="mt-2">
								<input
									type="tel"
									name="telefone"
									id="telefone"
									placeholder="(00) 00000-0000"
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="foto"
								className="block text-sm font-medium text-gray-700"
							>
								Foto de Perfil
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<UserCircleIcon
									className="h-12 w-12 text-gray-300"
									aria-hidden="true"
								/>
								<button
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									Alterar
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Address Section */}
				<div className="border-b border-gray-200 pb-12">
					<h2 className="text-xl font-semibold text-gray-900">Endereço</h2>
					<p className="mt-1 text-sm text-gray-600">
						Informe seu endereço completo.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="col-span-full">
							<label
								htmlFor="endereco"
								className="block text-sm font-medium text-gray-700"
							>
								Endereço Completo*
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="endereco"
									id="endereco"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Account Security Section */}
				<div className="border-b border-gray-200 pb-12">
					<h2 className="text-xl font-semibold text-gray-900">
						Segurança da Conta
					</h2>
					<p className="mt-1 text-sm text-gray-600">
						Crie uma senha segura para acessar sua conta.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="senha"
								className="block text-sm font-medium text-gray-700"
							>
								Senha*
							</label>
							<div className="mt-2">
								<input
									type="password"
									name="senha"
									id="senha"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="confirmar-senha"
								className="block text-sm font-medium text-gray-700"
							>
								Confirmar Senha*
							</label>
							<div className="mt-2">
								<input
									type="password"
									name="confirmar-senha"
									id="confirmar-senha"
									required
									className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					className="text-sm font-semibold text-gray-900 hover:text-gray-700"
				>
					Cancelar
				</button>
				<button
					type="submit"
					className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
				>
					Criar Conta
				</button>
			</div>
		</form>
	);
}

export default RegisterForm;