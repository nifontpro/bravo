import {FC, useState} from 'react';
import {useAuthRedirect} from "@/auth/presenter/useAuthRedirect";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthInput} from "@/auth/model/auth.interface";
import styles from '@/auth/presenter/Auth.module.scss';
import Meta from "@/core/utils/meta/Meta";
import AuthFields from "@/auth/presenter/AuthFields";
import Button from "@/core/presenter/ui/form/Button";
import {authApi} from "@/auth/data/auth.api";
import Heading from "@/core/presenter/ui/heading/Heading";

const Auth: FC = () => {

	useAuthRedirect()

	const [login, {isLoading}] = authApi.useLoginMutation()
	const [register] = authApi.useRegisterMutation()

	const [type, setType] = useState<'login' | 'register'>('login')
	const {register: registerInput, handleSubmit, formState} = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)
		// reset()
	}

	return (
		<Meta title='Auth'>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title='Авторизация' className='mb-6'/>
					<AuthFields formState={formState} register={registerInput} isPasswordRequired/>

					<div className={styles.buttons}>
						<Button type='submit' onClick={() => setType('login')} disabled={isLoading}>
							Login
						</Button>
						<Button type='submit' onClick={() => setType('register')} disabled={isLoading}>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	);
};

export default Auth;