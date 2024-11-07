import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import * as yup from "yup";
import {Users} from "../interfaces/User";
import {gettUsers} from "../userServices/userServies";
import {Link, useNavigate} from "react-router-dom";
import {errorMsg} from "../userServices/toastify";
import Loading from "../components/Loading";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<Users[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		sessionStorage.setItem("loggedIn", "false");
		const loggedInStatus = sessionStorage.getItem("loggedIn");

		if (loggedInStatus === "true") {
			setIsLoggedIn(!loggedIn);
			navigate("/home");
		} else {
			gettUsers()
				.then((res) => {
					setUsers(res.data);
					setIsLoggedIn(!loggedIn);
					setLoading(!loading);
				})
				.catch((err) => {
					errorMsg(err);
					setLoading(false);
				});
		}
	}, []);

	const formik: FormikValues = useFormik<FormikValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup
				.string()
				.required("Email is required")
				.min(2)
				.email("Invalid email format"),
			password: yup
				.string()
				.required("Password is required")
				.min(6, "Password must be at least 6 characters"),
		}),
		onSubmit: (values) => {
			if (!loading) {
				const user = users.find(
					(user) =>
						values.email === user.email && values.password === user.password,
				);
				if (user) {
					sessionStorage.setItem("userEmail", values.email);
					sessionStorage.setItem("loggedIn", "true");
					setIsLoggedIn(true);
					navigate("/home");
				} else {
					sessionStorage.setItem("loggedIn", "false");
					errorMsg("Invalid email or password");
					setIsLoggedIn(false);
					console.log(loggedIn);
					navigate("/");
				}
			}
		},
	});

	loading && <Loading />;

	return (
		<div className='text-center m-auto pt-5 login' style={{maxWidth: "28rem"}}>
			<form onSubmit={formik.handleSubmit} className='d-flex flex-column p-5'>
				<h1 className='text-light p-3'>LOGIN</h1>
				<input
					id='email'
					type='email'
					className='form-control mb-3 p-3'
					placeholder='Email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email && (
					<p className='text-danger'>{formik.errors.email}</p>
				)}
				<input
					id='password'
					type='password'
					className='form-control mb-3 p-3'
					placeholder='Password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password && (
					<p className='text-danger'>{formik.errors.password}</p>
				)}
				<button
					type='submit'
					className='btn btn-success'
					disabled={loading || formik.isSubmitting}
				>
					Login
				</button>
			</form>
			<h5 className='card-text my-3'>
				Don't have an account?{" "}
				<Link to={"/registry"}>
					<span className='text-primary p-3'>Register</span>
				</Link>
			</h5>
		</div>
	);
};

export default Login;
