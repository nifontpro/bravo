import {ChangeEvent, useMemo, useState} from "react";
// import {useDebounce} from "@/core/hooks/useDebounce";
import {departmentApi} from "@/department/data/department.api";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";

export const useDepartmentAdmin = (companyId?: string) => {
	const [searchTerm, setSearchTerm] = useState('')
	// const debouncedSearch = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	let departments: ITableItem[] | undefined = undefined
	let isLoading = false

	if (companyId) {
		const {isLoading: loading, data} = departmentApi.useGetAllAdminQuery(companyId)
		departments = data
		isLoading = loading
	}

	const [createDepartment] = departmentApi.useCreateMutation()
	const [deleteDepartment] = departmentApi.useDeleteMutation()

	return useMemo(
		() => {

			const createAsync = async () => {
				if (companyId) await createDepartment(companyId)
					.unwrap()
					.then(() => {
						toast.success("Отдел успешно создан")
					})
					.catch(e => {
						toastError(e, "Ошибка при создании отдела")
					})
			}

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
				departments,
				handleSearch,
				searchTerm,
				createAsync,
				deleteAsync
			}
		},
		[isLoading, departments, searchTerm, createDepartment, companyId, deleteDepartment]
	)
}