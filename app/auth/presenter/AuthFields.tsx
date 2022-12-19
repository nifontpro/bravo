import {FC} from 'react';
import {FormState, UseFormRegister} from "react-hook-form";
import {IAuthInput} from "@/auth/model/auth.interface";
import Field from "@/core/presenter/ui/form/Field/Field";
import {validEmail} from "@/core/utils/regex";

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<IAuthInput>
	isPasswordRequired?: boolean
}
 
const AuthFields: FC<IAuthFields> =
	({register, formState: {errors}, isPasswordRequired = false}) => {
		return (
			<>
				<Field
					{...register('login', {
						required: 'Логин обязательно',
						// pattern: {
						// 	value: validEmail,
						// 	message: 'Пожалуйста введите свой логин'
						// }
					})}
					placeholder='Ваш логин'
					title='Логин'
					error={errors.login}
					className='mb-[50px]'
				/>

				<Field
					{...register('password', isPasswordRequired ? {
						required: 'Пароль обязательно',
						minLength: {
							value: 4,
							message: 'Минимальная длина пароля 4 символа'
						}
					} : {})}
					placeholder='Введите пароль'
					title='Пароль'
					type='password'
					error={errors.password}
				/>
			</>
		);
	};

export default AuthFields;