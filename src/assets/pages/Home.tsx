import {FunctionComponent, useEffect, useState} from "react";
import BookList from "../components/bookList";
import AddNewBook from "../components/AddNewBook";
import {Book} from "../interfaces/Books";
interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
	const [isNewBook, setisNewBook] = useState<boolean>(false);


	return (
		<div className='row mx-auto'>
			<div className='col-sm-12 col-md-4'>
				<AddNewBook newBook={!isNewBook} />
			</div>
			<div className='col-sm-12 col-md-8  table-responsive'>
				<BookList newBook={!isNewBook} />
			</div>
		</div>
	);
};

export default Home;
