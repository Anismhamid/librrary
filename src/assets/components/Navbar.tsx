import {FunctionComponent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const emailUser = sessionStorage.getItem("userEmail");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loggedInStatus = sessionStorage.getItem("loggedIn");
		setIsLoggedIn(loggedInStatus === "true");
	}, [isLoggedIn]);

	const handleLogout = () => {
		sessionStorage.removeItem("userEmail");
		sessionStorage.setItem("loggedIn", "false");
		setIsLoggedIn(!isLoggedIn)
		navigate("/");
	};

	return (
		<nav className='navbar navbar-expand-lg bg-dark-subtle'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand me-5' to='/home'>
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
						{!isLoggedIn ? (
							<>
								<li className='nav-item'>
									<h5 className='card-title'>Wellcome, {emailUser||"Guste"}!</h5>
								</li>
								<li>
									<button
										onClick={handleLogout}
										className='btn btn-link text-primary'
									>
										Log Out
									</button>
								</li>
							</>
						) : (
							<div className='text-light pt-4'>
								<h5>Welcome to Books Library!</h5>
							</div>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
