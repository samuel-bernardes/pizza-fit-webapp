import AlunoRequest from "./endpoints/Aluno";
import AuthRequest from "./endpoints/Auth";

export default class ApiEndpoints {
	static AuthRequest = AuthRequest;
    static AlunoRequest = AlunoRequest; // Assuming AlunoRequest is also needed here
}
