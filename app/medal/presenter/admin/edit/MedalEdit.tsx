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
import {IMedalEditInput} from "@/medal/presenter/admin/edit/medal-edit.type";
import {useMedalEdit} from "@/medal/presenter/admin/edit/useMedalEdit";

const MedalEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<IMedalEditInput>({
			mode: 'onChange'
		})

	const {isLoading, onSubmit} = useMedalEdit(setValue)

	return <Meta title="Редактирование награды">
		<AdminNavigation/>
		<Heading title="Редактирование награды"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
			{isLoading ? <SkeletonLoader count={3}/> : <>
				<div className={formStyles.fields}>
					<Field
						{...register('name', {required: 'Наименование необходимо!'})}
						placeholder='Наименование награды'
						error={errors.name}
						style={{width: '80%'}}
					/>

					<Field
						{...register('description')}
						placeholder='Описание'
						error={errors.description}
						style={{width: '80%'}}
					/>

					<Field
						{...register('score', {required: 'Ценность необходима!'})}
						placeholder='Ценность (0-100)'
						error={errors.score}
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

export default MedalEdit