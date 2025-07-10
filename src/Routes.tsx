import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from "./components";
import { Home, Login, Register, StudentArea, Units } from "./pages";

function Routes() {
	const routes = [
		{ path: "/", element: <Home /> },
		{ path: "/unidades", element: <Units /> },
		{ path: "/perfil", element: <StudentArea /> },
	];

	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainLayout />,
			children: routes,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/registro",
			element: <Register />,
		},
		{
			path: "*",
			element: <>erro</>,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Routes;
