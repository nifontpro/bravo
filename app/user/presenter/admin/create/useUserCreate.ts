import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {IUserCreateInput} from "@/user/presenter/admin/create/user-create.type";
import {userApi} from "@/user/data/user.api";
import {toastError} from "@/core/utils/toast-error";
import {getAdminUrl} from "@/core/config/url.config";

export const useUserCreate = (
	setValue: UseFormSetValue<IUserCreateInput>,
	companyId?: string,
	departmentId?: string
) => {
	const {push} = useRouter()
	const [create] = userApi.useCreateMutation()
	const [updateImage] = userApi.useUpdateImageMutation()

	useEffect(() => {
		setValue('role', 'user')
	}, [setValue])

	const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {

		let isError = false

		if (companyId) {
			await create({
				email: data.email, login: data.login, password: data.password,
				lastname: data.lastname, patronymic: data.patronymic, firstname: data.firstname,
				role: data.role, companyId: companyId, departmentId: departmentId
			}).unwrap()
				.then(async ({id: userId}) => {
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
				.catch((e) => {
					isError = true
					toastError(e, "Ошибка создания профиля сотрудника")
				})
		} else {
			isError = true
			toast.error('Необходимо выбрать компанию')
		}
		if (!isError) {
			toast.success('Профиль сотрудника успешно создан')
			push(getAdminUrl('user')).then()
		}
	}

	return {onSubmit}
}