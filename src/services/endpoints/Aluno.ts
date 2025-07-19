import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";

export interface IAlunoModel {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	telefone: string;
	endereco: string;
	data_nasc: string;
	status: string;
	foto: string;
	id_plano: string | null;
	created_at: string;
	updated_at: string;
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

export default class AlunoRequest {
	public static GetAlunoById(
		idAluno: string
	): Promise<IResponse<IAlunoModel[]>> {
		return RestApi.httpGet(`/alunos/${idAluno}`);
	}

	public static CreateAluno(
		createAlunoDTO: ICreateAlunoDTO
	): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpPost(`/alunos`, createAlunoDTO);
	}
}
