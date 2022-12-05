import {ChangeEvent, useMemo, useState} from "react";
import {useDebounce} from "@/core/hooks/useDebounce";
import {departmentApi} from "@/department/data/department.api";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";
// import {getAdminUrl} from "@/core/config/url.config";
import {useRouter} from "next/router";

export const useDepartmentAdmin = (companyId: string) => {
	const [searchTerm, setSearchTerm] = useState('')
	const filter = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {isLoading, data: departments} = departmentApi.useGetByCompanyAdminQuery({companyId, filter})
	const [createDepartment] = departmentApi.useCreateMutation()
	const [deleteDepartment] = departmentApi.useDeleteMutation()

	const {push} = useRouter()

	return useMemo(
		() => {

			// const createAsync = async () => {
			// 	await createDepartment(companyId)
			// 		.unwrap()
			// 		.then((response) => {
			// 			toast.success("Отдел успешно создан")
			// 			push(getAdminUrl(`department/edit/${response.id}`))
			// 		})
			// 		.catch(e => {
			// 			toastError(e, "Ошибка при создании отдела")
			// 		})
			// }

			const deleteAsync = async (id: string) => {
				await deleteDepartment(id)
					.unwrap()
					.then(() => {
						toast.success("Отдел успешно удален")
					})
					.catch(e => {
						toastError(e, "Ошибка при удалении отдела")
					})
			}

			return {
				isLoading,
				medals: departments,
				handleSearch,
				searchTerm,
				// createAsync,
				deleteAsync
			}
		},
		[isLoading, departments, searchTerm, createDepartment, companyId, push, deleteDepartment]
	)
}