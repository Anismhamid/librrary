import {FunctionComponent, useEffect, useState} from "react";
import BookList from "../components/bookList";
import AddNewBook from "../components/AddNewBook";
import {Book} from "../interfaces/Books";
interface HomeProps {
	newBook: boolean;
}

const Home: FunctionComponent<HomeProps> = ({newBook}) => {
	const [isNewBook, setisNewBook] = useState<boolean>(false);

	return (
		<div className='row mx-auto'>
			<div className='col-sm-12 col-md-4'>
				<AddNewBook newBook={newBook} />
			</div>
			<div className='col-sm-12 col-md-8  table-responsive'>
				<BookList newBook={!isNewBook} />
			</div>
		</div>
	);
};

export default Home;
