import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";
import {IUserNomineeInput} from "./user-nominee.type";
import {rewardApi} from "../../data/reward.api";

export const useUserNominee = (
	setValue: UseFormSetValue<IUserNomineeInput>,
	userId: string,
	companyId?: string
) => {
	const {back} = useRouter()
	const [nominee] = rewardApi.useNomineeMutation()

	useEffect(() => {
	}, [setValue])

	const onSubmit: SubmitHandler<IUserNomineeInput> = async (data) => {

		if (companyId) {
			await nominee({userId, companyId, ...data}).unwrap()
				.then(async () => {
					toast.success('Сотрудник успешно номинирован на премию')
					back()
				})
				.catch((e) => {
					toastError(e, "Ошибка номинирования на премию")
				})
		} else {
			toast.error("Должна быть выбрана компания")
		}
	}

	return {onSubmit}
}