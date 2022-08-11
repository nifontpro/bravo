import {SubmitHandler, UseFormSetValue} from "react-hook-form";
import {ICompanyEditInput} from "@/company/presenter/admin/edit/company-edit.type";
import {useRouter} from "next/router";
import {companyApi} from "@/company/data/company.api";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {getAdminUrl} from "@/core/config/url.config";

export const useCompanyEdit = (setValue: UseFormSetValue<ICompanyEditInput>) => {
	const {push, query} = useRouter()
	const companyId = String(query.id)

	const {data: company, isLoading, isSuccess: isGetSuccess} = companyApi.useGetByIdQuery(companyId)
	const [update] = companyApi.useUpdateMutation()
	const [updateImage] = companyApi.useUpdateImageMutation()

	useEffect(() => {
		if (isGetSuccess && company) {
			setValue('name', company.name)
			setValue('description', company.description)
		}
	}, [company, isGetSuccess, setValue])

	const onSubmit: SubmitHandler<ICompanyEditInput> = async (data) => {

		let isError = false

		update({id: companyId, name: data.name, description: data.description})
			.unwrap()
			.then(() => {
				const fileData = data.file[0]
				if (fileData) {
					const formData = new FormData()
					formData.append("imageUrl", fileData)
					updateImage({companyId, formData})
						.unwrap()
						.catch(() => {
							isError = true
							toast.error("Ошибка обновления фото компании")
						})
				}

			})
			.catch(() => {
				isError = true
				toast.error("Ошибка обновления компании")
			})

		if (!isError) {
			toast.success('Компания успешно обновлена')
		}
		push(getAdminUrl('company')).then()
	}

	return {onSubmit, isLoading}
}