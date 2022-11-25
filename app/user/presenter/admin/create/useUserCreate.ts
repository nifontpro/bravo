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
	active: 'MALE' | 'FEMALE',
	companyId?: string,
	// departmentId?: string,

) => {
	const {push} = useRouter()
	const [create] = userApi.useCreateMutation()
	const [updateImage] = userApi.useUpdateImageMutation()

	useEffect(() => {
		setValue('role', 'user')
		setValue('companyId', companyId)
		setValue('isMNC', false)
	}, [setValue])

	const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {

		console.log(active)

		// let isError = false

		// if (companyId) {
		// 	await create({...data, companyId: companyId, departmentId: departmentId}).unwrap()
		// 		.then(async ({id: userId}) => {
		// 			const fileData = data.file[0]
		// 			if (fileData) {
		// 				const formData = new FormData()
		// 				formData.append("imageUrl", fileData)
		// 				await updateImage({userId, formData})
		// 					.unwrap()
		// 					.catch(() => {
		// 						isError = true
		// 						toast.error("Ошибка добавления фото сотрудника")
		// 					})
		// 			}
		// 		})
		// 		.catch((e) => {
		// 			isError = true
		// 			toastError(e, "Ошибка создания профиля сотрудника")
		// 		})
		// } else {
		// 	isError = true
		// 	toast.error('Необходимо выбрать компанию')
		// }
		// if (!isError) {
		// 	toast.success('Профиль сотрудника успешно создан')
		// 	push(getAdminUrl('user')).then()
		// }
	}

	return {onSubmit}
}