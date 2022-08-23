import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";
import {useMemo} from "react";
import {IAuthResponse} from "@/auth/model/auth.types";

/**
 * Хук устанавливает текущую компанию и отдел при входе пользователя
 */

export const useSetAuthData = () => {
	const [setCompany] = companyApi.useSetByIdMutation()
	const [setDepartment] = departmentApi.useSetByIdMutation()

	return useMemo(() => {

			const setAuthData = (data: IAuthResponse) => {
				const user = data.user
				if ((user.role == "admin" || user.role == "director" || user.role == "user") && user.companyId) {
					setCompany(user.companyId)
				}
				if ((user.role == "director" || user.role == "user") && user.departmentId) {
					setDepartment(user.departmentId)
				}
			}
			return {setAuthData}
		}, [setCompany, setDepartment]
	)
}