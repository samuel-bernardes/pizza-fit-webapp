import type { IResponse } from "../ApiBase";
import RestApi from "../ApiBase";
import type { IAlunoModel } from "./Aluno";

export interface IAuthResponse {
	aluno: IAlunoModel;
	token: string;
}

export interface ILoginCredentials {
	email: string;
	senha: string;
}

export default class AuthRequest {
	public static DoLogin(
		loginDTO: ILoginCredentials
	): Promise<IResponse<IAlunoModel>> {
		return RestApi.httpPost(`/auth/login`, loginDTO);
	}
}
