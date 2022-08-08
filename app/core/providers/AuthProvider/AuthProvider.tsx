import {FC, PropsWithChildren, useEffect} from 'react';
import {refreshApi} from "@/auth/data/auth.api";
import {getRefreshCookie} from "@/auth/data/auth.helper";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {

	const [refresh] = refreshApi.useRefreshMutation()

	useEffect(() => {
		const refreshToken = getRefreshCookie()
		if (refreshToken) refresh()
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>

};

export default AuthProvider;