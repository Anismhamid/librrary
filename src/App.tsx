import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {routes} from "./assets/pathes/routings";
import {ToastContainer} from "react-toastify";
import Navbar from "./assets/components/Navbar";
import {createContext, useContext} from "react";
import {useState} from "react";

const themes = {
	dark: {
		color: "#070200",
		backgroundColor: "#fff0ec",
	},
	light: {
		color: "#fff0ec",
		backgroundColor: "#070200",
	},
	gradient: {
		color: "background-image: linear-gradient(to right top, #536d96, #52739f, #4f79a8, #4c7fb0, #4785b9)",
	},
};

export const SiteTheme = createContext(themes.light);

function App() {
	const [darkModes, setdarkModes] = useState<boolean>(false);
	const [logged, setLogged] = useState<boolean>(false);

	return (
		<div className='App'>
			<ToastContainer />
			<SiteTheme.Provider
				value={darkModes ? themes.dark : themes.light || themes.gradient}
			>
				<Router>
					<header>
						<div className='form-check form-switch w-25 m-auto'>
							<input
								className='form-check-input'
								type='checkbox'
								role='switch'
								id='flexSwitchCheckDefault'
								onChange={() => setdarkModes(!darkModes)}
							/>
							<label
								className='form-check-label fs-5'
								htmlFor='flexSwitchCheckDefault'
							>
								{darkModes ? "Light Mode" : "Dark ode"}
							</label>
						</div>
						<Navbar logIn={false} />
					</header>
					<main>
						<Routes>
							{routes.map((pathConfig, index) => (
								<Route
									key={index}
									path={pathConfig.path}
									element={pathConfig.element}
								/>
							))}
						</Routes>
					</main>
				</Router>
			</SiteTheme.Provider>
		</div>
	);
}

export default App;
