import {FC, PropsWithChildren, useEffect} from 'react';
import {refreshApi} from "@/auth/data/auth.api";
import {getRefreshCookie} from "@/auth/data/auth.helper";
import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {

	const [refresh] = refreshApi.useRefreshMutation()
	const [setCompany] = companyApi.useSetByIdMutation()
	const [setDepartment] = departmentApi.useSetByIdMutation()

	useEffect(() => {
		const refreshToken = getRefreshCookie()
		if (refreshToken) {
			refresh().unwrap().then(data => {
				const user = data.user
				if ((user.role == "admin" || user.role == "director" || user.role == "user") && user.companyId) {
					setCompany(user.companyId)
				}
				if ((user.role == "director" || user.role == "user") && user.departmentId) {
					setDepartment(user.departmentId)
				}
			})
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>

};

export default AuthProvider;