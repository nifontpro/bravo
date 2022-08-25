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
import {useUserEdit} from "@/user/presenter/admin/edit/useUserEdit";
import {IUserEditInput} from "@/user/presenter/admin/edit/user-edit.type";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const UserEdit: FC = () => {

	const {handleSubmit, register, formState: {errors}, setValue} =
		useForm<IUserEditInput>({
			mode: 'onChange'
		})

	const {user, isLoading, onSubmit} = useUserEdit(setValue)

	const [image, setImage] = useState<string | undefined>(undefined)

	const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	useEffect(() => {
		setImage(user?.imageUrl)
	}, [user])

	return <Meta title="Редактирование профиля сотрудника">
		<AdminNavigation/>
		<Heading title="Редактирование профиля сотрудника"/>
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
						{...register('lastname', {required: 'Фамилия необходима!'})}
						placeholder='Фамилия'
						error={errors.lastname}
						style={{width: '31%'}}
					/>

					<Field
						{...register('firstname', {required: 'Имя необходимо!'})}
						placeholder='Имя'
						error={errors.firstname}
						style={{width: '31%'}}
					/>

					<Field
						{...register('patronymic')}
						placeholder='Отчество'
						error={errors.patronymic}
						style={{width: '31%'}}
					/>

					<Field
						{...register('login')}
						placeholder='Логин (Уникальный)'
						error={errors.login}
						style={{width: '31%'}}
					/>

					<Field
						{...register('password')}
						placeholder='Пароль'
						error={errors.password}
						style={{width: '31%'}}
					/>

					<Field
						{...register('email')}
						placeholder='Email'
						error={errors.email}
						style={{width: '31%'}}
					/>
				</div>
				<Button className="">Обновить</Button>
			</>}
		</form>
	</Meta>
}

export default UserEdit