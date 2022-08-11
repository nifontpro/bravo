import {ChangeEvent, useEffect, useMemo, useState} from "react";
// import {useDebounce} from "@/core/hooks/useDebounce";
import {companyApi} from "@/company/data/company.api";
import {toast} from "react-toastify";

export const useCompany = () => {
	const [searchTerm, setSearchTerm] = useState('')
	// const debouncedSearch = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {isLoading, isError: isLoadingError, data: companies} = companyApi.useGetAllAdminQuery()
	const [createAsync, {isError: isCreateError}] = companyApi.useCreateMutation()
	const [deleteAsync, {isError: isDeleteError}] = companyApi.useDeleteMutation()

	useEffect(() => {
		if (isCreateError) {
			toast.error("Ошибка при создании компании")
		}

		if (isLoadingError) {
			toast.error("Ошибка загрузки компаний")
		}

		if (isDeleteError) {
			toast.error("Ошибка при удалении компании")
		}

	}, [isLoadingError, isCreateError, isDeleteError])

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