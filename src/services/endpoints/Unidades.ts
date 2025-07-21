import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";

// Tipagem para o modelo de Acesso
export interface IUnidadesModel {
	id: string;
	endereco: string;
	nome: string;
	foto?: string;
}

export default class UnidadesRequest {
    public static GetUnidades(): Promise<IResponse<IUnidadesModel[]>> {
        return RestApi.httpGet(`/unidades`);
    }
}
