import Home from "../pages/Home";
import Login from "../pages/Login";
import Registry from "../pages/Registry";



export const routes = [
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/registry",
		element: <Registry />,
	},
];

