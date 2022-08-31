import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAuthState} from "@/auth/data/auth.slice";

export const useAuthRedirect = () => {
	const {user} = useAuthState()

	const {query, push} = useRouter()

	const redirect = query.redirect ? String(query.redirect) : '/'
	console.log(redirect)

	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])
}