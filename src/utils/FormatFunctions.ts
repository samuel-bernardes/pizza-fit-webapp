const formatarHora = (data: string) => {
	return new Date(data).toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

const formatarData = (data: string) => {
	return new Date(data).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};

const formatarCPF = (cpf: string) => {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatarTelefone = (telefone: string) => {
	return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export { formatarHora, formatarData, formatarCPF, formatarTelefone };
