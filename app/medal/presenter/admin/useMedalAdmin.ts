import {ChangeEvent, useMemo, useState} from "react";
import {medalApi} from "@/medal/data/medal.api";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";
import {getAdminUrl} from "@/core/config/url.config";
import {useRouter} from "next/router";
import {useDebounce} from "@/core/hooks/useDebounce";

export const useMedalAdmin = (companyId: string) => {
	const [searchTerm, setSearchTerm] = useState('')
	const filter = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {isLoading, data: medals} = medalApi.useGetByCompanyAdminQuery({companyId, filter})
	const [createMedal] = medalApi.useCreateMutation()
	const [deleteMedal] = medalApi.useDeleteMutation()

	const {push} = useRouter()

	return useMemo(
		() => {

			const createAsync = async () => {
				if (companyId) await createMedal(companyId)
					.unwrap()
					.then((response) => {
						toast.success("Награда успешно создана")
						push(getAdminUrl(`medal/edit/${response.id}`))
					})
					.catch(e => {
						toastError(e, "Ошибка при создании награды")
					})
			}

			const deleteAsync = async (id: string) => {
				await deleteMedal(id)
					.unwrap()
					.then(() => {
						toast.success("Награда удалена")
					})
					.catch(e => {
						toastError(e, "Ошибка при удалении награды")
					})
			}

			return {
				isLoading,
				medals,
				handleSearch,
				searchTerm,
				createAsync,
				deleteAsync
			}
		},
		[isLoading, medals, searchTerm, companyId, createMedal, deleteMedal, push]
	)
}