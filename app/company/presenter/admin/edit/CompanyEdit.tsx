import {FC} from 'react'
import {useForm} from "react-hook-form";
import {ICompanyEditInput} from "@/company/presenter/admin/edit/company-edit.type";
import {useCompanyEdit} from "@/company/presenter/admin/edit/useCompanyEdit";
import Meta from "@/core/utils/meta/Meta";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import Heading from "@/core/presenter/ui/heading/Heading";
import SkeletonLoader from "@/core/presenter/ui/sceleton-loader/SkeletonLoader";
import formStyles from "@/core/presenter/ui/form/admin-form.module.scss"
import styles from "@/core/presenter/ui/form/form.module.scss"
import Field from "@/core/presenter/ui/form/Field";
import Button from "@/core/presenter/ui/form/Button";
import cn from "classnames";

const CompanyEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<ICompanyEditInput>({
			mode: 'onChange'
		})

	const {isLoading, onSubmit} = useCompanyEdit(setValue)

	return <Meta title="Редактирование компании">
		<AdminNavigation/>
		<Heading title="Редактирование компании"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
			{isLoading ? <SkeletonLoader count={3}/> : <>
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

export default CompanyEdit