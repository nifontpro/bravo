import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";
import {useMemo} from "react";
import {IAuthResponse} from "@/auth/model/auth.types";
import {authSlice} from "@/auth/data/auth.slice";
import {useDispatch} from "react-redux";

/**
 * Хук устанавливает текущую компанию и отдел при входе пользователя
 */

export const useSetAuthData = () => {
	const [setCompany] = companyApi.useSetByIdMutation()
	const [setDepartment] = departmentApi.useSetByIdMutation()
	const dispatch = useDispatch()

	return useMemo(() => {

			const setAuthData = (data: IAuthResponse) => {
				const user = data.user
				if ((user.role == "admin" || user.role == "director" || user.role == "user") && user.companyId) {
					setCompany(user.companyId)
				}
				if ((user.role == "director" || user.role == "user") && user.departmentId) {
					setDepartment(user.departmentId)
				}
				dispatch(authSlice.actions.setWs()) // Открываем сокет
			}
			return {setAuthData}
		}, [dispatch, setCompany, setDepartment]
	)
}