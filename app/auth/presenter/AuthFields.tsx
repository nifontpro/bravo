import {FC} from 'react';
import {FormState, UseFormRegister} from "react-hook-form";
import {IAuthInput} from "@/auth/model/auth.interface";
import Field from "@/core/presenter/ui/form/Field";
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
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: validEmail,
							message: 'Please enter a valid email address'
						}
					})}
					placeholder='E-mail'
					error={errors.email}
				/>

				<Field
					{...register('password', isPasswordRequired ? {
						required: 'Password is required',
						minLength: {
							value: 4,
							message: 'Min length should more 4 symbols'
						}
					} : {})}
					placeholder='Password'
					type='password'
					error={errors.password}
				/>
			</>
		);
	};

export default AuthFields;