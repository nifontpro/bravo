import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {IMedalEditInput, IMedalUpdate} from "@/medal/presenter/admin/edit/medal-edit.type";
import {useRouter} from "next/router";
import {medalApi} from "@/medal/data/medal.api";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {getAdminUrl} from "@/core/config/url.config";
import {toastError} from "@/core/utils/toast-error";

export const useMedalEdit = (setValue: UseFormSetValue<IMedalEditInput>) => {
	const {push, query} = useRouter()
	const medalId = String(query.id)

	const {data: medal, isLoading, isSuccess} = medalApi.useGetByIdQuery(medalId)
	const [update] = medalApi.useUpdateMutation()
	const [updateImage] = medalApi.useUpdateImageMutation()

	useEffect(() => {
		if (isSuccess && medal) {
			setValue('name', medal.name)
			setValue('description', medal.description)
			setValue('score', medal.score)
		}
	}, [medal, isSuccess, setValue])

	const onSubmit: SubmitHandler<IMedalEditInput> = async (data) => {
		if (medal) {
			let isError = false
			const medalUpdate: IMedalUpdate = {
				id: medal.id,
				companyId: medal.companyId+'08',
				name: data.name,
				description: data.description,
				score: data.score
			}
			await update(medalUpdate)
				.unwrap()
				.then(async () => {
					const fileData = data.file[0]
					if (fileData) {
						const formData = new FormData()
						formData.append("imageUrl", fileData)
						await updateImage({medalId, formData})
							.unwrap()
							.catch(() => {
								isError = true
								toast.error("Ошибка обновления фото награды")
							})
					}

				})
				.catch((e) => {
					isError = true
					toastError(e, "Ошибка обновления награды")
				})

			if (!isError) {
				toast.success('Награда успешно обновлена')
				await push(getAdminUrl('medal'))
			}
		}
	}

	return {onSubmit, isLoading}
}