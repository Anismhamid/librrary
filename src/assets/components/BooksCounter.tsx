import {FunctionComponent, useEffect, useState} from "react";
import {gettAllBooks} from "../userServices/booksServices";
import {Book} from "../interfaces/Books";

interface BooksCounterProps {}

const BooksCounter: FunctionComponent<BooksCounterProps> = () => {
	const [bookCount, setBookCount] = useState<number>(0);
	const [genreCount, setGenreCount] = useState<number>(0);
	const [authorCount, setAuthorCount] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await gettAllBooks();
				const books = res.data;

				setBookCount(books.length);

				const authors = new Set(books.map((book: Book) => book.author));
				const genres = new Set(books.map((book: Book) => book.genre));

				setAuthorCount(authors.size);
				setGenreCount(genres.size);
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='login'>
			<table className='table table-dark'>
				<thead>
					<tr>
						<th>Authors Count</th>
						<th>Books Count</th>
						<th>Genres Count</th>
					</tr>
				</thead>
				<tbody className='table-active'>
					<tr>
						<td>{authorCount}</td>
						<td>{bookCount}</td>
						<td>{genreCount}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default BooksCounter;
