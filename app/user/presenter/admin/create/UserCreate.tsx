import {FC} from 'react'
import {Controller, useForm} from "react-hook-form";
import Meta from "@/core/utils/meta/Meta";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import Heading from "@/core/presenter/ui/heading/Heading";
import formStyles from "@/core/presenter/ui/form/admin-form.module.scss"
import styles from "@/core/presenter/ui/form/form.module.scss"
import Field from "@/core/presenter/ui/form/Field";
import Button from "@/core/presenter/ui/form/Button";
import cn from "classnames";
import {IUserCreateInput} from "@/user/presenter/admin/create/user-create.type";
import Select from "@/core/presenter/ui/select/Select";
import {IOption} from "@/core/presenter/ui/select/select.interface";
import {useCompanyState} from "@/company/data/company.slice";
import {useDepartmentState} from "@/department/data/department.slice";
import {useUserCreate} from "@/user/presenter/admin/create/useUserCreate";

const UserCreate: FC = () => {

	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()

	const {handleSubmit, register, formState: {errors}, setValue, control} =
		useForm<IUserCreateInput>({mode: 'onChange'})

	const {onSubmit} = useUserCreate(setValue, currentCompany?.id, currentDepartment?.id)

	/*
		const onSubmit: SubmitHandler<IUserCreateInput> = data => {
			console.log(`Создание пользователя ${data.role}`)
		}
	*/

	const roles: IOption[] = [
		{label: 'Администратор компании', value: 'admin'},
		{label: 'Директор отдела', value: 'director'},
		{label: 'Обычный сотрудник', value: 'user'},
	]

	return <Meta title="Создание профиля сотрудника">
		<AdminNavigation/>
		<Heading title="Создание профиля сотрудника"/>
		<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
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
					{...register('password', {required: 'Пароль обязателен!'})}
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

				<Controller
					name="role"
					control={control}
					rules={{
						required: 'Необходимо выбрать роль!',
					}}
					render={({field, fieldState: {error}}) => (
						<Select
							error={error}
							field={field}
							placeholder="Роль"
							options={roles || []}
							isLoading={false}
							isMulti={false}
						/>
					)}
				/>

			</div>

			<div className={cn(styles.field, styles.uploadField)}>
				<div className={styles.uploadFlex}>
					<label>
						<span>Выберите фото сотрудника</span>
						<input type="file" {...register("file")}/>
					</label>
				</div>
			</div>

			<Button>Создать</Button>
		</form>
	</Meta>
}

export default UserCreate