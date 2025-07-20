import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import { UserContextProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserContextProvider>
			<Routes />
		</UserContextProvider>
	</StrictMode>
);
