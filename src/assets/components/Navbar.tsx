import {FunctionComponent, useContext, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {SiteTheme} from "../../App";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const theme = useContext(SiteTheme);
	const emailUser = sessionStorage.getItem("userEmail");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loggedInStatus = sessionStorage.getItem("loggedIn");
		if (loggedInStatus === "true") {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("userEmail");
		sessionStorage.setItem("loggedIn", "false");
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<nav
			className='navbar'
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
				<hr />
				{!isLoggedIn && (
					<ul className='navbar-nav text-dark mt-2 d-flex'>
						<li className='nav-item'>
							<h5
								className='card-title'
								style={{
									backgroundColor: theme.backgroundColor,
									color: theme.color,
								}}
							>
								{emailUser || "Guste"}
							</h5>
						</li>
						{!isLoggedIn && (
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
						)}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
