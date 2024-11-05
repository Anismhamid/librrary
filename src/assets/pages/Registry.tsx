import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useEffect, useRef, useState} from "react";
import * as yup from "yup";
import {Users} from "../interfaces/User";
import {gettUsers, postUsers} from "../userServices/userServies";
import {Link, useNavigate} from "react-router-dom";
import {errorMsg} from "../userServices/toastify";

interface RegistryProps {}

const Registry: FunctionComponent<RegistryProps> = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<Users[]>([]);

	useEffect(() => {
		gettUsers().then((res) => {
			setUsers(res.data);
		});
	}, []);

	const formik: FormikValues = useFormik<FormikValues>({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			name: yup.string().required("The name is required"),
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
		onSubmit:async (values) => {
			const userExist = users.find((user) => values.email === user.email);
			if (!userExist) {
				try {
					await postUsers(values as Users);
					navigate("/");
				} catch (err) {
					errorMsg("Failed to register user. Please try again.");
				}
			} else {
				errorMsg("The email is already in use. Please try another.");
			}
		},
	});

	return (
		<div className='text-center pt-5 login m-auto' style={{maxWidth: "28rem"}}>
			<form
				onSubmit={formik.handleSubmit}
				className='d-flex flex-column p-3'
			>
				<h1 className=" text-light p-3">REGISTRY</h1>
				<input
					id='name'
					type='name'
					className='form-control mb-3 p-3'
					placeholder='Username'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name && (
					<p className='text-danger'>{formik.errors.name}</p>
				)}
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
				<button type='submit' className='btn btn-success'>
					registry
				</button>
			</form>
			<Link to={"/"} className='text-primary h5'>
				Login
			</Link>
		</div>
	);
};

export default Registry;
