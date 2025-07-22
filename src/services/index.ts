import AcessosRequest from "./endpoints/Acessos";
import AlunoRequest from "./endpoints/Aluno";
import AuthRequest from "./endpoints/Auth";
import PlanosRequest from "./endpoints/Planos";
import UnidadesRequest from "./endpoints/Unidades";

export default class ApiEndpoints {
	static AuthRequest = AuthRequest;
	static AlunoRequest = AlunoRequest; // Assuming AlunoRequest is also needed here
	static UnidadesRequest = UnidadesRequest;
    static AcessosRequest = AcessosRequest;
	static PlanosRequest = PlanosRequest; // Assuming PlanosRequest is similar to UnidadesRequest
}
