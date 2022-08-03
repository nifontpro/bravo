import {FC, PropsWithChildren, useEffect} from 'react';
import dynamic from "next/dynamic";
import {TypeComponentAuthFields} from "@/auth/model/auth.roles";
import {refreshApi} from "@/auth/data/auth.api";

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {ssr: false})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (
	{children, Component: {role}}
) => {

	const [refresh] = refreshApi.useRefreshMutation()

	// const {user} = useAuth()
	// const {pathname} = useRouter()

	/*	useEffect(() => {
			const accessToken = Cookies.get('accessToken')
			if (accessToken) {
				checkAuth()
			}
		}, [])// eslint-disable-line react-hooks/exhaustive-deps*/

	useEffect(() => {

		refresh()
		/*
				const refreshToken = Cookies.get('refreshToken')
				if (!refreshToken && user) authActions.logout()
		*/
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	return !!role
		? <>{children}</>
		: <DynamicCheckRole Component={{role}}>{children}</DynamicCheckRole>

};

export default AuthProvider;