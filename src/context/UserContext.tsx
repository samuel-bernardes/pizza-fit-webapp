import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import type { IAlunoModel } from "../services/endpoints/Aluno";
import RestApi from "../services/ApiBase";

interface UserContextType {
	user: IAlunoModel | null;
	login: (user: IAlunoModel, token: string) => void;
	logout: (showDialog?: boolean) => void;
	updateUser: (updatedUser: Partial<IAlunoModel>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IAlunoModel | null>(() => {
		const storedUser = sessionStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			RestApi.setAuthToken();
		}
	}, []);

	const login = (userData: IAlunoModel, token: string) => {
		sessionStorage.setItem("user", JSON.stringify(userData));
		sessionStorage.setItem("token", token);
		RestApi.setAuthToken();
		setUser(userData);
	};

	const logout = (showDialog?: boolean) => {
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("token");
		RestApi.setAuthToken();
		setUser(null);
	};

	const updateUser = (updatedUser: Partial<IAlunoModel>) => {
		if (!user) return;

		const newUserData = {
			...user,
			...updatedUser,
		};

		sessionStorage.setItem("user", JSON.stringify(newUserData));
		setUser(newUserData);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			"useUserContext deve ser usado dentro de um UserContextProvider"
		);
	}
	return context;
};
