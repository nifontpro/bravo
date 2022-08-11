import {ChangeEvent, useEffect, useMemo, useState} from "react";
// import {useDebounce} from "@/core/hooks/useDebounce";
import {toast} from "react-toastify";
import {departmentApi} from "@/department/data/department.api";
import {useCompanyState} from "@/company/data/company.slice";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {toastError} from "@/core/utils/toast-error";

export const useDepartmentAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	// const debouncedSearch = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	let departments: ITableItem[] | undefined = undefined
	let isLoading = false
	let isLoadingError = false

	const {currentCompany} = useCompanyState()
	if (currentCompany) {
		const {isLoading: loading, isError, data} = departmentApi.useGetAllAdminQuery(currentCompany.id)
		departments = data
		isLoading = loading
		isLoadingError = isError
	}

	const [createAsync, {isError: isCreateError, error: createError}] = departmentApi.useCreateMutation()
	const [deleteAsync, {isError: isDeleteError, error: deleteError}] = departmentApi.useDeleteMutation()

	useEffect(() => {
		if (isCreateError) {
			toastError(createError, "Ошибка при создании отдела")
		}

		if (isLoadingError) {
			toast.error("Ошибка загрузки отделов")
		}

		if (isDeleteError) {
			toast.error("Ошибка при удалении отдела")
		}

	}, [isLoadingError, isCreateError, isDeleteError, createError])

	return useMemo(
		() => ({
			isLoading,
			departments,
			handleSearch,
			searchTerm,
			createAsync,
			deleteAsync
		}),
		[isLoading, departments, searchTerm, createAsync, deleteAsync]
	)

}