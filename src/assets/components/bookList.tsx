import {faPenFancy, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FunctionComponent, useEffect, useState} from "react";
import {Book} from "../interfaces/Books";
import {deleteBook, gettAllBooks} from "../userServices/booksServices";
import {errorMsg} from "../userServices/toastify";
import Loading from "./Loading";

interface BookListProps {
	newBook: boolean;
}

const BookList: FunctionComponent<BookListProps> = ({newBook = false}) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [isRendered, setIsRendered] = useState<boolean>(false);
	const [shouldFetch, setShouldFetch] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const deletee = <FontAwesomeIcon icon={faTrash} />;
	const edit = <FontAwesomeIcon icon={faPenFancy} />;

	useEffect(() => {
		const fetchBooks = async () => {
			if (shouldFetch) {
				try {
					const res = await gettAllBooks();
					setBooks(res.data);
					setShouldFetch(!shouldFetch);
					setIsLoading(!isLoading);
				} catch (error) {
					errorMsg("error");
				}
			}
		};
		fetchBooks();
	}, [shouldFetch]);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<div className='row m-auto w-100'>
				<div className='col-sm-12 col-md-4 col-lg-3'>
					<table className='table table-dark table-hover m-auto'>
						<thead>
							<tr className=''>
								<th colSpan={1}>#ID</th>
								<th colSpan={3}>Name</th>
								<th colSpan={2}>Author</th>
								<th colSpan={2}>Genre</th>
								<th colSpan={2}>Price</th>
								<th colSpan={1}>edit</th>
								<th colSpan={1}>delete</th>
							</tr>
						</thead>
						<tbody>
							{books.length ? (
								books.map((book) => (
									<tr className='table-active' key={book.id}>
										<td colSpan={1}>{book.id}</td>
										<td colSpan={3}>{book.bookName}</td>
										<td colSpan={2}>{book.author}</td>
										<td colSpan={2}>{book.genre}</td>
										<td colSpan={2}>{book.price} &#8362;</td>
										<td>
											<span className='text-success'>{edit}</span>
										</td>
										<td colSpan={1}>
											<span
												onClick={async () => {
													try {
														if (
															window.confirm(
																"are you sure you want to delete!?",
															)
														) {
															await deleteBook(
																book.id as string,
															)
																.then(() => {
																	setIsRendered(
																		!isRendered,
																	);
																})
																.catch((err) => {
																	console.log(err);
																});
															setBooks(
																books.filter(
																	(b) =>
																		b.id !== book.id,
																),
															);
														}
													} catch (error) {
														errorMsg(
															`Error while deleting book:", ${error}`,
														);
													}
												}}
												className='text-danger'
											>
												{deletee}
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7}>No data</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default BookList;
