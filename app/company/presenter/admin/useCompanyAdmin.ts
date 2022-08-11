import {ChangeEvent, useEffect, useMemo, useState} from "react";
// import {useDebounce} from "@/core/hooks/useDebounce";
import {companyApi} from "@/company/data/company.api";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";

export const useCompanyAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	// const debouncedSearch = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {isLoading, isError: isLoadingError, data: companies} = companyApi.useGetAllAdminQuery()
	const [createAsync, {isError: isCreateError}] = companyApi.useCreateMutation()

	const [deleteAsync, {
		isError: isDeleteError,
		error: deleteError,
		isSuccess: isDeleteSuccess
	}] = companyApi.useDeleteMutation()

	useEffect(() => {
		if (isCreateError) {
			toast.error("Ошибка при создании компании")
		}

		if (isLoadingError) {
			toast.error("Ошибка загрузки компаний")
		}

	}, [isLoadingError, isCreateError])

	useEffect(() => {

		if (isDeleteSuccess) {
			toast.success("Компания успешно удалена")
		}
/*		if (deleteError !== undefined) {

			toastError(deleteError, "Ошибка при удалении компании")
		}*/

		if (isDeleteError) {
			toastError(deleteError, "Ошибка при удалении компании")
		}

	}, [isDeleteSuccess, isDeleteError, deleteError])

	return useMemo(
		() => ({
			isLoading,
			companies,
			handleSearch,
			searchTerm,
			createAsync,
			deleteAsync
		}),
		[isLoading, companies, searchTerm, createAsync, deleteAsync]
	)

}