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
import {IMedalEditInput} from "@/medal/presenter/admin/edit/medal-edit.type";
import {useMedalEdit} from "@/medal/presenter/admin/edit/useMedalEdit";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const MedalEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<IMedalEditInput>({
			mode: 'onChange'
		})

	const {medal, isLoading, onSubmit} = useMedalEdit(setValue)

	const [image, setImage] = useState<string | undefined>(undefined)

	const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	useEffect(() => {
		setImage(medal?.imageUrl)
	}, [medal])

	return <Meta title="Редактирование награды">
		<AdminNavigation/>
		<Heading title="Редактирование награды"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
			{isLoading ? <SkeletonLoader count={3}/> : <>

				<div className={cn(styles.field, styles.uploadField)}>
					<div className={styles.uploadFlex}>
						<label>
							<ImageDefault
								src={image} width={150} height={150} alt="preview image" objectFit="cover"
								className="rounded-full"
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
						{...register('name', {required: 'Наименование необходимо!'})}
						placeholder='Наименование награды'
						error={errors.name}
						style={{width: '77%'}}
					/>

					<Field
						{...register('score', {required: 'Ценность необходима!'})}
						placeholder='Ценность (0-100)'
						error={errors.score}
						style={{width: '20%'}}
					/>

					<Field
						{...register('description')}
						placeholder='Описание'
						error={errors.description}
						style={{width: '100%'}}
					/>
				</div>
				<Button>Обновить</Button>
			</>}
		</form>
	</Meta>
}

export default MedalEdit