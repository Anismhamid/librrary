import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {routes} from "./assets/pathes/routings";
import {ToastContainer} from "react-toastify";
import Navbar from "./assets/components/Navbar";
import {createContext, useContext} from "react";
import {useState} from "react";

const themes = {
	dark: {
		color: "white",
		backgroundColor: "#031618",
	},
	light: {
		color: "black",
		backgroundColor: "white",
	},
};

export const SiteTheme = createContext(themes.dark);

function App() {
	const [darkModes, setdarkModes] = useState<boolean>(false);

	return (
		<div
			className='App'
			style={{minHeight:"100vh"}}
		>
			<ToastContainer />
			<SiteTheme.Provider value={darkModes ? themes.dark : themes.light}>
				<Router>
					<div className='form-check form-switch w-100'>
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
							{darkModes ? "Dark" : "Light"}
						</label>
					</div>
					<Routes>
						{routes.map((pathConfig, index) => (
							<Route
								key={index}
								path={pathConfig.path}
								element={pathConfig.element}
							/>
						))}
					</Routes>
				</Router>
			</SiteTheme.Provider>
		</div>
	);
}

export default App;
