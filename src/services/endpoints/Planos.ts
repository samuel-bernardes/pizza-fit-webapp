import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";
import type { IAlunoModel } from "./Aluno";

export interface IPlanoModel {
	id: string;
	nome: string;
	duracao: string;
	descricao: string;
	preco: number;
}

export default class PlanosRequest {
	public static GetPlanos(): Promise<IResponse<IPlanoModel[]>> {
		return RestApi.httpGet(`/planos`);
	}

	public static SetPlanoDoAluno(body: {
		planoId: string;
	}): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpPost(`/planos/aluno`, body); // Envia o objeto completo
	}
}
