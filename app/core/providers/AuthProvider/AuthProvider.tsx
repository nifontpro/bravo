import {FC, PropsWithChildren, useEffect} from 'react';
import dynamic from "next/dynamic";
import {TypeComponentAuthFields} from "@/auth/model/auth.roles";
import {refreshApi} from "@/auth/data/auth.api";
import {authActions, useAuthState} from "@/auth/data/auth.slice";
import {useRouter} from "next/router";
import {getRefreshCookie} from "@/auth/data/auth.helper";

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {ssr: false})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (
	{children, Component: {role}}
) => {

	const {user} = useAuthState()
	const {logout} = authActions
	const [refresh] = refreshApi.useRefreshMutation()

	const {pathname} = useRouter()

	useEffect(() => {
		const refreshToken = getRefreshCookie()
		if (refreshToken) refresh()
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const refreshToken = getRefreshCookie()
		if (!refreshToken && user) logout()
	}, [pathname])// eslint-disable-line react-hooks/exhaustive-deps

	return role
		? <DynamicCheckRole Component={{role}}>{children}</DynamicCheckRole>
		: <>{children}</>

};

export default AuthProvider;