import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFormik} from "formik";
import {FunctionComponent, useEffect} from "react";
import * as yup from "yup";
import {addBook} from "../userServices/booksServices";
import {Book} from "../interfaces/Books";
import {errorMsg, successMsg} from "../userServices/toastify";

interface AddNewBookProps {
	newBook: boolean
}

const AddNewBook: FunctionComponent<AddNewBookProps> = () => {

	const formik = useFormik({
		initialValues: {
			bookName: "",
			author: "",
			genre: "",
			price: "",
		},
		validationSchema: yup.object({
			bookName: yup
				.string()
				.required("Book name is required")
				.min(2, "Must be at least 2 characters"),
			author: yup
				.string()
				.required("Author is required")
				.min(2, "Must be at least 2 characters"),
			genre: yup.string().required("Genre is required"),
			price: yup
				.number()
				.required("Price is required")
				.positive("Price must be a positive number"),
		}),
		onSubmit: async (values, {resetForm}) => {
			try {
				await addBook(values as Book);
				successMsg(`The book ${values.bookName} was added successfully.`);
				resetForm();
			} catch (error) {
				errorMsg(`The book ${values.bookName} could not be added.`);
			}
		},
	});

	const plus = <FontAwesomeIcon icon={faPlus} />;

	return (
		<form
			className='login p-4 m-auto'
			onSubmit={formik.handleSubmit}
			style={{maxWidth: "20rem"}}
		>
			<h1>Add Book</h1>
			<input
				className='form-control'
				name='bookName'
				type='text'
				placeholder='Book name'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.bookName}
			/>
			{formik.touched.bookName && formik.errors.bookName && (
				<p className='text-danger fs-5 mt-2 fw-bold'>{formik.errors.bookName}</p>
			)}
			<input
				className='form-control mt-2'
				type='text'
				name='author'
				placeholder='Author'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.author}
			/>
			{formik.touched.author && formik.errors.author && (
				<p className='text-danger fs-5 mt-2 fw-bold'>{formik.errors.author}</p>
			)}
			<select
				name='genre'
				className='form-control w-100 p-2 my-2'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.genre}
			>
				<option value=''>Select an option</option>
				<option value='Fiction'>Fiction</option>
				<option value='Dystopian'>Dystopian</option>
				<option value='Classic'>Classic</option>
				<option value='Post-Apocalyptic'>Post-Apocalyptic</option>
				<option value='Fantasy'>Fantasy</option>
				<option value='Satire'>Satire</option>
			</select>
			{formik.touched.genre && formik.errors.genre && (
				<p className='text-danger fs-5 mt-2 fw-bold'>{formik.errors.genre}</p>
			)}
			<input
				className='form-control'
				type='number'
				placeholder='Price'
				name='price'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.price}
			/>
			{formik.touched.price && formik.errors.price && (
				<p className='text-danger fs-5 mt-2 fw-bold'>{formik.errors.price}</p>
			)}
			<div className='row border p-2 mt-2'>
				<div className='col-12 text-start'>
					<button
						type='submit'
						className='btn m-auto btn-success w-50 d-flex align-items-center justify-content-around'
					>
						<span>{plus}</span> Add
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddNewBook;
