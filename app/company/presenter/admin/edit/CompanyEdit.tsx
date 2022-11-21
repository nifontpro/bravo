import {ChangeEvent, FC, useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {ICompanyEditInput} from "@/company/presenter/admin/edit/company-edit.type";
import {useCompanyEdit} from "@/company/presenter/admin/edit/useCompanyEdit";
import Meta from "@/core/utils/meta/Meta";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import Heading from "@/core/presenter/ui/heading/Heading";
import SkeletonLoader from "@/core/presenter/ui/sceleton-loader/SkeletonLoader";
import formStyles from "@/core/presenter/ui/form/admin-form.module.scss"
import styles from "@/core/presenter/ui/form/form.module.scss"
import Field from "@/core/presenter/ui/form/Field/Field";
import Button from "@/core/presenter/ui/form/Button";
import cn from "classnames";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const CompanyEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<ICompanyEditInput>({
			mode: 'onChange'
		})

	const {company, isLoading, onSubmit} = useCompanyEdit(setValue)

	const [image, setImage] = useState<string | undefined>(undefined)

	const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	useEffect(() => {
		setImage(company?.imageUrl)
	}, [company])

	return <Meta title="Редактирование компании">
		<AdminNavigation/>
		<Heading title="Редактирование компании"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
			{isLoading ? <SkeletonLoader count={3}/> : <>

				<div className={cn(styles.field, styles.uploadField)}>
					<div className={styles.uploadFlex}>
						<label>
							<ImageDefault
								src={image} width={150} height={150} alt="preview image" objectFit="cover"
								className="rounded-xl"
							/>
							<div>
								<span>Выберите новое изображение</span>
								<input type="file" {...register("file")} onChange={onImageChange}/>
							</div>
						</label>
					</div>
				</div>

				<div className={formStyles.fields}>
					<Field
						{...register('name', {required: 'Name is required!'})}
						placeholder='Название компание'
						error={errors.name}
						style={{width: '80%'}}
					/>

					<Field
						{...register('description', {required: 'Description is required!'})}
						placeholder='Описание'
						error={errors.description}
						style={{width: '80%'}}
					/>

				</div>

				<Button>Обновить</Button>
			</>}
		</form>
	</Meta>
}

export default CompanyEdit