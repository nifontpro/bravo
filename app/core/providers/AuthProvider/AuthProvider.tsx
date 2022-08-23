import {FC, PropsWithChildren, useEffect} from 'react';
import {refreshApi} from "@/auth/data/auth.api";
import {getRefreshCookie} from "@/auth/data/auth.helper";
import {companyApi} from "@/company/data/company.api";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {

	const [refresh] = refreshApi.useRefreshMutation()
	const [setCompany] = companyApi.useSetByIdMutation()

	useEffect(() => {
		const refreshToken = getRefreshCookie()
		if (refreshToken) {
			refresh().unwrap().then(data => {
				const user = data.user
				if (user.role == "admin" && user.companyId) {
					setCompany(user.companyId)
				}
			})
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>

};

export default AuthProvider;