import { useEffect, useState } from 'react';
import UnidadeRequest, { IUnidadeModel } from '../requests/UnidadeRequest'; // ajuste o path conforme sua estrutura

function Units() {
	const [units, setUnits] = useState<IUnidadeModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUnits = async () => {
			try {
				setLoading(true);
				const response = await UnidadeRequest.GetAllUnidades();
				
				if (response.success) {
					setUnits(response.data);
				} else {
					setError('Erro ao carregar unidades');
				}
			} catch (err) {
				setError('Erro ao conectar com o servidor');
				console.error('Erro ao buscar unidades:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchUnits();
	}, []);

	if (loading) {
		return (
			<div className="bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<div className="flex justify-center items-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
						</div>
						<p className="mt-4 text-lg text-gray-600">Carregando unidades...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-2xl font-semibold text-red-600">
							Erro ao carregar unidades
						</h2>
						<p className="mt-2 text-lg text-gray-600">{error}</p>
						<button 
							onClick={() => window.location.reload()}
							className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							Tentar novamente
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<main>
				<div className="bg-white py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
								Nossas Unidades
							</h2>
							<p className="mt-2 text-lg/8 text-gray-600">
								Conheça nossas academias e encontre a mais perto de você
							</p>
						</div>
						
						{units.length === 0 ? (
							<div className="mx-auto max-w-2xl text-center mt-12">
								<p className="text-lg text-gray-600">
									Nenhuma unidade encontrada.
								</p>
							</div>
						) : (
							<div className="mx-auto mt-12 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
								{units.map((unit) => (
									<article
										key={unit.id}
										className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
									>
										<img
											alt={unit.nome}
											src={unit.foto || 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
											className="absolute inset-0 -z-10 size-full object-cover"
											onError={(e) => {
												e.currentTarget.src = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
											}}
										/>
										<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
										<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

										<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
											{unit.horario && (
												<span className="mr-8">{unit.horario}</span>
											)}
											{unit.equipamentos && (
												<div className="-ml-4 flex items-center gap-x-4">
													<svg
														viewBox="0 0 2 2"
														className="-ml-0.5 size-0.5 flex-none fill-white/50"
													>
														<circle r={1} cx={1} cy={1} />
													</svg>
													<div className="flex gap-x-2.5">
														<span className="truncate">{unit.equipamentos}</span>
													</div>
												</div>
											)}
										</div>
										<h3 className="mt-3 text-lg/6 font-semibold text-white">
											<span className="absolute inset-0" />
											{unit.nome}
										</h3>
										<p className="mt-2 text-sm text-gray-300">{unit.endereco}</p>
									</article>
								))}
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default Units;
