import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";
import type { IAlunoModel } from "./Aluno";

// Tipagem para o modelo de Acesso
export interface IAcessoModel {
	id: string;
	hora_entrada: string;
	hora_saida: string | null;
	id_aluno: string;
	id_unidade: string;
	descricao_atividade: string | null;
	created_at: string;
	updated_at: string;
}

export default class AcessosRequest {
	public static GetAcessosByAlunoId(
		alunoId: string
	): Promise<IResponse<IAcessoModel[]>> {
		return RestApi.httpGet(`/acessos/aluno/${alunoId}`);
	}
}
