import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";

// Tipagem para o modelo de Acesso
export interface IAcessoModel {
	id: string;
	horaEntrada: string;
	horaSaida?: string;
	idAluno: string;
	idUnidade: string;
	descricaoAtividades?: string;
	nomeUnidade?: string;
	enderecoUnidade?: string;
	created_at: string;
	updated_at: string;
}

export interface IAcessoCreateModel {
	idAluno: string;
	idUnidade: string;
	descricaoAtividades?: string;
	horaEntrada: string;
	horaSaida?: string | null;
}

export interface IAcessoUpdateModel {
	idAluno: string;
	descricaoAtividades?: string;
}

export default class AcessosRequest {
	public static GetAcessosByAlunoId(
		alunoId: string
	): Promise<IResponse<IAcessoModel[]>> {
		return RestApi.httpGet(`/acessos/aluno/${alunoId}`);
	}

	public static CreateAcesso(
		createAcessoDTO: IAcessoCreateModel
	): Promise<IResponse<IAcessoModel>> {
		return RestApi.httpPost(`/acessos`, createAcessoDTO);
	}

	public static UpdateAcesso(
		acessoId: string,
		updateAcessoDTO: IAcessoUpdateModel
	): Promise<IResponse<IAcessoModel>> {
		return RestApi.httpPut(`/acessos/${acessoId}`, updateAcessoDTO);
	}
}
