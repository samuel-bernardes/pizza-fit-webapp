import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";

export interface IUnidadeModel {
	id: string;
	endereco: string;
	nome: string;
	foto?: string;
}

export interface ICreateUnidadeDTO {
	endereco: string;
	nome: string;
	foto?: string;
}

export type IUpdateUnidadeDTO = Partial<ICreateUnidadeDTO>;

export default class UnidadeRequest {
	public static GetUnidadeById(idUnidade: string): Promise<IResponse<IUnidadeModel>> {
		return RestApi.httpGet(`/unidades/${idUnidade}`);
	}

	public static GetAllUnidades(): Promise<IResponse<IUnidadeModel[]>> {
		return RestApi.httpGet(`/unidades`);
	}

	public static CreateUnidade(
		createUnidadeDTO: ICreateUnidadeDTO
	): Promise<IResponse<IUnidadeModel>> {
		return RestApi.httpPost(`/unidades`, createUnidadeDTO);
	}

	public static UpdateUnidade(
		updateUnidadeDTO: IUpdateUnidadeDTO,
		idUnidade: string
	): Promise<IResponse<IUnidadeModel>> {
		return RestApi.httpPut(`/unidades/${idUnidade}`, updateUnidadeDTO);
	}

	public static DeleteUnidade(idUnidade: string): Promise<IResponse<IUnidadeModel>> {
		return RestApi.httpDelete(`/unidades/${idUnidade}`);
	}
}

