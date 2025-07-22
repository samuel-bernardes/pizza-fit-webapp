import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import type { IAcessoCreateModel } from "../services/endpoints/Acessos";
import { useEffect, useState } from "react";
import UnidadesRequest, { type IUnidadeModel } from "../services/endpoints/Unidades";

interface ICreateAcessModalProps {
	newAcesso: IAcessoCreateModel;
	showCreateModal: boolean;
	setShowCreateModal: (show: boolean) => void;
	createAcesso: () => Promise<void>;
	setNewAcesso: (acesso: IAcessoCreateModel) => void;
}

function CreateAcessModal(props: ICreateAcessModalProps) {
	const {
		createAcesso,
		setShowCreateModal,
		setNewAcesso,
		showCreateModal,
		newAcesso,
	} = props;

	const [unidades, setUnidades] = useState<IUnidadeModel[]>([]);

	// Fetch unidades when the modal opens
	const fetchUnidades = async () => {
		try {
			const response = await UnidadesRequest.GetAllUnidades();
			if (response.status == 200 && response.data) {
				setUnidades(response.data);
			} else {
				console.error("Failed to fetch unidades:", response.error);
			}
		} catch (error) {
			console.error("Error fetching unidades:", error);
		}
	};

	useEffect(() => {
		fetchUnidades();
	}, []);

	return (
		<Dialog
			open={showCreateModal}
			onClose={setShowCreateModal}
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
								onClick={() => setShowCreateModal(false)}
								className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
							>
								<span className="sr-only">Close</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>

						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
								Criar Novo Acesso
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Unidade
									</label>
									<select
										value={newAcesso.idUnidade}
										onChange={(e) =>
											setNewAcesso({
												...newAcesso,
												idUnidade: e.target.value,
											})
										}
										className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
									>
										<option value="">Selecione uma unidade</option>
										{unidades.map((unidade) => (
											<option key={unidade.id} value={unidade.id}>
												{unidade.nome}
											</option>
										))}
									</select>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Hora de Entrada
										</label>
										<input
											type="datetime-local"
											value={newAcesso.horaEntrada || ""}
											onChange={(e) =>
												setNewAcesso({
													...newAcesso,
													horaEntrada: e.target.value,
												})
											}
											className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Hora de Saída (Opcional)
										</label>
										<input
											type="datetime-local"
											value={newAcesso.horaSaida || ""}
											min={newAcesso.horaEntrada || ""}
											onChange={(e) =>
												setNewAcesso({
													...newAcesso,
													horaSaida: e.target.value || null,
												})
											}
											className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Descrição das Atividades (Opcional)
									</label>
									<textarea
										rows={3}
										value={newAcesso.descricaoAtividades || ""}
										onChange={(e) =>
											setNewAcesso({
												...newAcesso,
												descricaoAtividades: e.target.value || "",
											})
										}
										placeholder="Descreva as atividades planejadas"
										className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
									/>
								</div>
							</div>

							<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={createAcesso}
									disabled={!newAcesso.idUnidade}
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
								>
									Criar Acesso
								</button>
								<button
									onClick={() => setShowCreateModal(false)}
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Cancelar
								</button>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

export default CreateAcessModal;
