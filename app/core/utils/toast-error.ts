import {errorCatch} from "@/core/utils/api.helpers";
import {toast} from "react-toastify";

export const toastError = (error: any, title?: string) => {
	const message = errorCatch(error)
	const ttl = title || 'Error request'
	toast.error(`${ttl}: ${message}`)
	throw message
}