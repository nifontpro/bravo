import {userApi} from "@/user/data/user.api";
import {useCompanyState} from "@/company/data/company.slice";
import {useDepartmentState} from "@/department/data/department.slice";
import {useMemo} from "react";
import {IUser} from "@/user/model/user.types";

/**
 * Возвращает список руководителей компаний и сотрудников отдела
 */
export const useMyUser = () => {

	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()
	let depUsers: IUser[] = []

	if (currentDepartment) {
		const {data: _depUsers} = userApi.useGetByDepartmentQuery(currentDepartment.id)
		depUsers = _depUsers || []
	}

	const {isLoading, data: _bosses} = userApi.useGetBossesQuery(currentCompany?.id)
	const bosses = _bosses || []
	const users = bosses.concat(depUsers)

	return useMemo(
		() => {

			return {
				isLoading,
				users,
			}
		},
		[isLoading, users]
	)
}