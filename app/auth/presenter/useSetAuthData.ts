import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";
import {useMemo} from "react";
import {IAuthResponse} from "@/auth/model/auth.types";
import {ICompany} from "@/company/model/company.types";

/**
 * Хук устанавливает текущую компанию и отдел при входе пользователя
 */

export const useSetAuthData = () => {
	const [setCompany] = companyApi.useSetByIdMutation()
	const [setDepartment] = departmentApi.useSetByIdMutation()
	const [getOwnerCompanies] = companyApi.useGetByOwnerParamMutation()
	// const dispatch = useDispatch()

	return useMemo(() => {

			const setAuthData = async (data: IAuthResponse) => {
				const user = data.user

				if ((user.role == "admin" || user.role == "director" || user.role == "user") && user.companyId) {
					setCompany(user.companyId)
				}
				if ((user.role == "director" || user.role == "user") && user.departmentId) {
					setDepartment(user.departmentId)
				}

				if (user.role == "owner") {
					await getOwnerCompanies().unwrap().then(async (companies: ICompany[]) => {
						if (companies.length > 0) {
							setCompany(companies[0].id)
						}
					})
				}

				// dispatch(authSlice.actions.setWs()) // Открываем сокет
			}
			return {setAuthData}
		}, [getOwnerCompanies, setCompany, setDepartment]
	)
}