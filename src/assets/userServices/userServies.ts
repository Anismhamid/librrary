import axios from "axios";
import {Users} from "../interfaces/User";

let api = `${process.env.REACT_APP_API}`;

export function gettUsers() {
	return axios.get(`${api}/users`);
}

export function postUsers(userData: Users) {
	return axios.post(`${api}/users`, userData);
}
