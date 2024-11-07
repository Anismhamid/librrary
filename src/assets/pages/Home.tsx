import {FunctionComponent, createContext, useContext, useState, useTransition} from "react";
import BookList from "../components/bookList";
import AddNewBook from "../components/AddNewBook";
import { SiteTheme } from "../../App";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const theme = useContext(SiteTheme)
	const [isNewBook, setIsNewBook] = useState<boolean>(false);

	const handleNewBookAdded = () => {
		setIsNewBook((prev) => !prev);
	};


	return (
		<div className='row mx-auto' >
			<div
				className='col-sm-12 col-md-4'
			>
				<AddNewBook onNewBookAdded={handleNewBookAdded} />
			</div>
			<div className='col-sm-12 col-md-8 table-responsive' style={{backgroundImage:theme.color, color: theme.color}}>
				<BookList newBook={isNewBook} />
			</div>
		</div>
	);
};

export default Home;
