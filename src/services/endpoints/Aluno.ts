import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";

export interface IPlanoModel {
	id: string;
	nome: string;
	duracao: string;
	descricao: string;
}

export interface IAlunoModel {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	telefone: string;
	endereco: string;
	dataNasc: string;
	status: string;
	foto: string;
	idPlano: string | null;
	createdAt: string;
	updatedAt: string;

	// Novo campo opcional vindo do backend
	plano?: IPlanoModel;
}

export interface ICreateAlunoDTO {
	nome: string;
	email: string;
	senha: string;
	cpf: string;
	telefone: string;
	endereco: string;
	dataNasc: string;
	foto: string;
}

export type IUpdateAlunoDTO = Partial<Omit<ICreateAlunoDTO, "senha">>;

export default class AlunoRequest {
	public static GetAlunoById(idAluno: string): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpGet(`/alunos/${idAluno}`);
	}

	public static CreateAluno(
		createAlunoDTO: ICreateAlunoDTO
	): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpPost(`/alunos`, createAlunoDTO);
	}

	public static UpdateAluno(
		updateAlunoDTO: IUpdateAlunoDTO,
		idAluno: string
	): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpPut(`/alunos/${idAluno}`, updateAlunoDTO);
	}

	public static DeleteAluno(idAluno: string): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpDelete(`/alunos/${idAluno}`);
	}
}
