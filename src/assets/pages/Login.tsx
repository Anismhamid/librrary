import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import * as yup from "yup";
import {Users} from "../interfaces/User";
import {gettUsers} from "../userServices/userServies";
import {Link, useNavigate} from "react-router-dom";
import {errorMsg} from "../userServices/toastify";
import Loading from "../components/Loading";
import {SiteTheme} from "../../App";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<Users[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
	const theme = useContext(SiteTheme);

	useEffect(() => {
		gettUsers()
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			})
			.catch((err) => {
				errorMsg(err);
				setLoading(true);
			});
	}, [loggedIn]);

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
					setIsLoggedIn(!loggedIn);
					setUsers(values as any);
					navigate("/home");
				} else {
					sessionStorage.setItem("loggedIn", "false");
					setIsLoggedIn(false);
					errorMsg("Invalid email or password");
				}
			}
		},
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<div
			className='text-center m-auto pt-5 login mt-5'
			style={{
				maxWidth: "28rem",
				backgroundColor: theme.backgroundColor,
				color: theme.color,
			}}
		>
			<form
				style={{
					backgroundColor: theme.backgroundColor,
					color: theme.color,
				}}
				onSubmit={formik.handleSubmit}
				className='d-flex flex-column p-5'
			>
				<h1
					className='p-3'
					style={{
						backgroundColor: theme.backgroundColor,
						color: theme.color,
					}}
				>
					LOGIN
				</h1>
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
