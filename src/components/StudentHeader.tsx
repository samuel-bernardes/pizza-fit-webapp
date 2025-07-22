import { CalendarIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import type { IAlunoModel } from "../services/endpoints/Aluno";
import { formatarData } from "../utils/FormatFunctions";

interface IStudentHeaderProps {
	aluno: IAlunoModel;
}

function StudentHeader(props: IStudentHeaderProps) {
	const { aluno } = props;


	return (
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
							Ativo desde: {formatarData(aluno.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StudentHeader;
