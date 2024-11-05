import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function successMsg(msg: string) {
	toast.success(msg, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
}

export function errorMsg(msg: string) {
	toast.error(msg, {
		position: "top-center",
		autoClose: 6000,
	});
}
