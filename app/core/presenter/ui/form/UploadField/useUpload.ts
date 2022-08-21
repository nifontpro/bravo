import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {toastError} from "@/core/utils/toast-error";
import {FileService} from "@/core/data/file.service";
import {useMutation} from "react-query";

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const {mutateAsync} = useMutation(
		'UploadFile',
		(data: FormData) => FileService.upload(data, folder),
		{
			onSuccess({data}) {
				onChange(data[0].url)
			},
			onError(error) {
				toastError(error, 'Upload image')
			},
		}
	)

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (!files?.length) return
			const formData = new FormData()
			formData.append('image', files[0])
			await mutateAsync(formData)

			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		},
		[mutateAsync]
	)

	return useMemo(() => ({uploadFile: uploadFile, isLoading}), [uploadFile, isLoading])
}