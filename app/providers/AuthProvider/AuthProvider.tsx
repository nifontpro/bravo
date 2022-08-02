import {FC, PropsWithChildren, useEffect} from 'react';
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import {TypeComponentAuthFields} from "../../model/auth.types";

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {ssr: false})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (
	{children, Component: {role}}
) => {

	const {user} = useAuth()
	const {logout, checkAuth} = useActions()
	// const {pathname} = useRouter()

/*	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			checkAuth()
		}
	}, [])// eslint-disable-line react-hooks/exhaustive-deps*/

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (refreshToken) {
			checkAuth()
		}
		if (!refreshToken && user) logout()
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	return !!role
		? <>{children}</>
		: <DynamicCheckRole Component={{role}}>{children}</DynamicCheckRole>

};

export default AuthProvider;