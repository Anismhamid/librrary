import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {routes} from "./assets/pathes/routings";
import {ToastContainer} from "react-toastify";
import Navbar from "./assets/components/Navbar";

function App() {
	return (
		<div className='App'>
			<ToastContainer />
			<Router>
				<header>
					<Navbar />
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
		</div>
	);
}

export default App;
