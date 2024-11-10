import {FunctionComponent, useContext, useState} from "react";
import BookList from "../components/bookList";
import AddNewBook from "../components/AddNewBook";
import {SiteTheme} from "../../App";
import Navbar from "../components/Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const theme = useContext(SiteTheme);
	const [isNewBook, setIsNewBook] = useState<boolean>(false);

	const handleNewBookAdded = () => {
		setIsNewBook((prev) => !prev);
	};

	return (
		<>
			<header>
				<Navbar logIn={isNewBook} />
			</header>
			<main>
				<div className='row mx-auto pt-5'>
					<div className='col-sm-12 col-md-4 mb-5'>
						<AddNewBook newBook={handleNewBookAdded} />
					</div>
					<div
						className='col-sm-12 col-md-8 table-responsive'
						style={{backgroundImage: theme.color, color: theme.color}}
					>
						<BookList newBook={isNewBook} />
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
