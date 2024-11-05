import axios from "axios";
import { Book } from "../interfaces/Books";


let api = `${process.env.REACT_APP_API}`;

export async function addBook(bookData: Book) {
	return await axios.post(`${api}/books`, bookData);
}

export function deleteBook(bookId:string) {
	return axios.delete(`${api}/books/${bookId}`);
}

export async function gettAllBooks() {
	return await axios.get(`${api}/books`);
}

