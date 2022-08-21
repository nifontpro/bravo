import {toast} from "react-toastify";

export const toastError = (error: any, title?: string) => {


	const message = error?.data?.message
	const msg = message ? `: ${message}` : ''

	const ttl = title || 'Ошибка запроса'
	toast.error(`${ttl} ${msg}`)
	// throw message
}

/*
export const toastError = (error: any, title?: string) => {
	const message = errorCatch(error)
	const ttl = title || 'Ошибка запроса'
	toast.error(`${ttl}: ${message}`)
	throw message
}
*/
