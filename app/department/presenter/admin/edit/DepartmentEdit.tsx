import {FC} from 'react'
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

const DepartmentEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<IDepartmentEditInput>({
			mode: 'onChange'
		})

	const {isLoading, onSubmit} = useDepartmentEdit(setValue)

	return <Meta title="Редактирование отдела">
		<AdminNavigation/>
		<Heading title="Редактирование отдела"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
			{isLoading ? <SkeletonLoader count={3}/> : <>
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

				<div className={cn(styles.field, styles.uploadField)}>
					<div className={styles.uploadFlex}>
						<label>
							<span>Выберите новое изображение</span>
							<input type="file" {...register("file")}/>
						</label>
					</div>
				</div>

				<Button>Обновить</Button>
			</>}
		</form>
	</Meta>
}

export default DepartmentEdit