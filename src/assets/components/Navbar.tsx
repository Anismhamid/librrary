import {FunctionComponent, useContext, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {SiteTheme} from "../../App";

interface NavbarProps {
	onNewBookAdded: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const theme = useContext(SiteTheme);
	const emailUser = localStorage.getItem("userEmail");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loggedInStatus = localStorage.getItem("loggedIn");
		if (loggedInStatus === "true") {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("userEmail");
		localStorage.setItem("loggedIn", "false");
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{backgroundColor: theme.backgroundColor, color: theme.color}}
		>
			<div className='container-fluid'>
				<NavLink
					className='navbar-brand me-5'
					to='/home'
					style={{backgroundColor: theme.backgroundColor, color: theme.color}}
				>
					Navbar
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<hr />
					<ul className='navbar-nav text-dark mt-2'>
						{isLoggedIn && (
							<>
								<li className='nav-item'>
									<h5
										className='card-title'
										style={{
											backgroundColor: theme.backgroundColor,
											color: theme.color,
										}}
									>
										Username: {emailUser || "Guste"}
									</h5>
								</li>
								<li>
									<button
										onClick={handleLogout}
										className='btn btn-outline-primary'
										style={{
											backgroundColor: theme.backgroundColor,
											color: theme.color,
										}}
									>
										Log Out
									</button>
								</li>
							</>
						)}
						{!isLoggedIn && (
							<li className='nav-item'>
								<h5
									className='card-title'
									style={{
										backgroundColor: theme.backgroundColor,
										color: theme.color,
									}}
								>
									welcome to Laibrary Project
								</h5>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
