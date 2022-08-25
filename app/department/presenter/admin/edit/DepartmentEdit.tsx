import {ChangeEvent, FC, useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import Meta from "@/core/utils/meta/Meta";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import Heading from "@/core/presenter/ui/heading/Heading";
import SkeletonLoader from "@/core/presenter/ui/sceleton-loader/SkeletonLoader";
import formStyles from "@/core/presenter/ui/form/admin-form.module.scss"
import styles from "@/core/presenter/ui/form/form.module.scss"
import Field from "@/core/presenter/ui/form/Field";
import Button from "@/core/presenter/ui/form/Button";
import cn from "classnames";
import {IDepartmentEditInput} from "@/department/presenter/admin/edit/department-edit.type";
import {useDepartmentEdit} from "@/department/presenter/admin/edit/useDepartmentEdit";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const DepartmentEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<IDepartmentEditInput>({
			mode: 'onChange'
		})

	const {department, isLoading, onSubmit} = useDepartmentEdit(setValue)

	const [image, setImage] = useState<string | undefined>(undefined)

	const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	useEffect(() => {
		setImage(department?.imageUrl)
	}, [department])

	return <Meta title="Редактирование отдела">
		<AdminNavigation/>
		<Heading title="Редактирование отдела"/>
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
						{...register('name', {required: 'Название необходимо!'})}
						placeholder='Название отдела'
						error={errors.name}
						style={{width: '80%'}}
					/>

					<Field
						{...register('description', {required: 'Описание необходимо!'})}
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

export default DepartmentEdit