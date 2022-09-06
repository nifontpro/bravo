import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {userApi} from "@/user/data/user.api";
import {toastError} from "@/core/utils/toast-error";
import {IUserRewardInput} from "@/user/presenter/reward/user-reward.type";

export const useUserReward = (
	setValue: UseFormSetValue<IUserRewardInput>,
	userId: string,
) => {
	const {back} = useRouter()
	const [reward] = userApi.useRewardMutation()

	useEffect(() => {
	}, [setValue])

	const onSubmit: SubmitHandler<IUserRewardInput> = async (data) => {

		await reward({...data, userId}).unwrap()
			.then(async () => {
				toast.success('Сотрудник успешно награжден')
				back()
			})
			.catch((e) => {
				toastError(e, "Ошибка награждения сотрудника")
			})
	}

	return {onSubmit}
}