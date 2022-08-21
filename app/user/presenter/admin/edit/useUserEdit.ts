import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {getAdminUrl} from "@/core/config/url.config";
import {userApi} from "@/user/data/user.api";
import {IUserEditInput} from "@/user/presenter/admin/edit/user-edit.type";

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const {push, query} = useRouter()
	const userId = String(query.id)

	const {data: user, isLoading, isSuccess: isGetSuccess} = userApi.useGetByIdQuery(userId)
	const [update] = userApi.useUpdateMutation()
	const [updateImage] = userApi.useUpdateImageMutation()

	useEffect(() => {
		if (isGetSuccess && user) {
			setValue('firstname', user.name)
			setValue('patronymic', user.patronymic)
			setValue('lastname', user.lastname)
			setValue('login', user.login)
			setValue('password', user.password || '')
			setValue('email', user.email)
		}
	}, [user, isGetSuccess, setValue])

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {

		let isError = false

		await update({
			id: userId, firstname: data.firstname, lastname: data.lastname, patronymic: data.patronymic,
			login: data.login, email: data.email, password: data.password
		})
			.unwrap()
			.then(async () => {
				const fileData = data.file[0]
				if (fileData) {
					const formData = new FormData()
					formData.append("imageUrl", fileData)
					await updateImage({userId, formData})
						.unwrap()
						.catch(() => {
							isError = true
							toast.error("Ошибка обновления фото сотрудника")
						})
				}
			})
			.catch(() => {
				isError = true
				toast.error("Ошибка обновления профиля сотрудника")
			})

		if (!isError) {
			toast.success('Профиль сотрудника успешно обновлен')
			await push(getAdminUrl('user'))
		}
	}

	return {onSubmit, isLoading}
}