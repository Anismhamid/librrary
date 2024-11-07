import {faPenFancy, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FunctionComponent, useEffect, useState} from "react";
import {Book} from "../interfaces/Books";
import {deleteBook, gettAllBooks} from "../userServices/booksServices";
import {errorMsg} from "../userServices/toastify";
import Loading from "./Loading";

interface BookListProps {
	newBook: boolean
}

const BookList: FunctionComponent<BookListProps> = ({newBook}) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const res = await gettAllBooks();
				setBooks(res.data);
				setIsLoading(false);
			} catch (error) {
				errorMsg("Error fetching books");
			}
		};
		fetchBooks();
	}, [newBook]);

	if (isLoading) {
		return <Loading />;
	}

	return (
				<table className='table table-dark table-hover m-auto w-100'>
					<thead>
						<tr>
							<th>#ID</th>
							<th>Name</th>
							<th>Author</th>
							<th>Genre</th>
							<th>Price</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{books.length ? (
							books.map((book) => (
								<tr className='table-active' key={book.id}>
									<td>{book.id}</td>
									<td>{book.bookName}</td>
									<td>{book.author}</td>
									<td>{book.genre}</td>
									<td>{book.price} &#8362;</td>
									<td>
										<span className='text-success'>
											<FontAwesomeIcon icon={faPenFancy} />
										</span>
									</td>
									<td>
										<span
											onClick={async () => {
												try {
													if (
														window.confirm(
															"Are you sure you want to delete this book?",
														)
													) {
														await deleteBook(
															book.id as string,
														);
														setBooks(
															books.filter(
																(b) => b.id !== book.id,
															),
														);
													}
												} catch (error) {
													errorMsg(
														`Error deleting book: ${error}`,
													);
												}
											}}
											className='text-danger'
										>
											<FontAwesomeIcon icon={faTrash} />
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
	);
};

export default BookList;
