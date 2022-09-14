import React, {FC} from 'react'
import {medalApi} from "@/medal/data/medal.api";
import {useCompanyState} from "@/company/data/company.slice";
import {useRouter} from "next/router";
import Meta from "@/core/utils/meta/Meta";
import {userApi} from "@/user/data/user.api";
import SelectMedal from "@/core/presenter/ui/list/SelectMedal";
import Button from "@/core/presenter/ui/form/Button";
import {useUserNominee} from "./useUserNominee";
import {Controller, useForm} from "react-hook-form";
import {IUserNomineeInput} from "./user-nominee.type";
import Heading from "@/core/presenter/ui/heading/Heading";
import formStyles from "@/core/presenter/ui/form/admin-form.module.scss";
import Field from "@/core/presenter/ui/form/Field";

const NomineeUser: FC = () => {

	const {query} = useRouter()
	const userId = String(query.userId)

	const {data: user} = userApi.useGetByIdQuery(userId, {skip: !(query.userId)})
	const {currentCompany} = useCompanyState()
	const {data: medals} = medalApi.useGetByCompanyQuery(currentCompany?.id || '', {skip: !currentCompany})

	const {handleSubmit, register, formState: {errors}, setValue, control} =
		useForm<IUserNomineeInput>({mode: 'onChange'})

	const {onSubmit} = useUserNominee(setValue, userId, currentCompany?.id)

	return user ?
		<Meta title={user.name} description={`Номинация сотрудника ${user.name} на премию`}>
			<Heading title={`Номинация сотрудника: ${user.lastname} ${user.name} ${user.patronymic}`}/>

			{currentCompany ?
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>

						<Field
							{...register('name', {required: 'Наименование обязательно!'})}
							placeholder='Наименование'
							error={errors.name}
							className="w-full my:w-[77%]"
						/>

						<Field
							{...register('score', {required: 'Необходима!'})}
							placeholder='Ценность'
							error={errors.score}
							className="w-full my:w-[20%]"
						/>

						<Field
							{...register('description')}
							placeholder='Описание награждения'
							error={errors.description}
							className="w-full"
						/>

						<div className="w-full">
							<Controller
								name="medalId"
								control={control}
								rules={{
									required: 'Необходимо выбрать медаль!',
								}}
								render={({field, fieldState: {error}}) => (
									<div>
										<SelectMedal
											medals={medals || []}
											onClick={(medal) => {
												field.onChange(medal.id)
											}}
										/>
										{error && <div className="text-red-600 pt-3">{error.message}</div>}
									</div>
								)}
							/>
						</div>
						<div className="w-full mx-auto">
						<Button className="mt-5">Наградить</Button>
						</div>
					</div>
				</form>
				:
				<div>
					Необходимо выбрать компанию для получения списка наград!
				</div>
			}
		</Meta>
		:
		<div>
			Сотрудник не найден
		</div>
}

export default NomineeUser