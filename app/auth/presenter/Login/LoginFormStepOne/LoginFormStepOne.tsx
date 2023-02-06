import React from 'react';
import styles from './LoginFormStepOne.module.scss';
import { LoginFormStepOneProps } from './LoginFormStepOne.props';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import Field from '@/core/presenter/ui/form/Field/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginInput } from '@/auth/model/auth.interface';
import { useAuthRedirect } from '../../useAuthRedirect';
import { validEmail } from '@/core/utils/regex';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { authApi } from '@/auth/data/auth.api';
import { loginActions } from '@/auth/data/login.slice';
import { useDispatch } from 'react-redux';
import { toastError } from '@/core/utils/toast-error';
import P from '@/core/presenter/ui/P/P';
import Link from 'next/link';
import { ILoginPasswordCheck } from './login.interface';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const LoginFormStepOne = ({
  visible,
  setVisible,
  className,
  ...props
}: LoginFormStepOneProps): JSX.Element => {
  useAuthRedirect();
  const dispatch = useDispatch();

  const [registerStepOne] = authApi.useRegisterStepOneMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<ILoginPasswordCheck>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginPasswordCheck> = async (data) => {
    if (data.password !== data.passwordCheck) {
      toast.error('Пароли не совпадают!');
    } else {
      const { email, login, name, password } = data;
      registerStepOne({ email, login, name, password })
        .unwrap()
        .catch((e) => {
          toastError(e, 'Ошибка регистрации');
        });
      dispatch(loginActions.setEmail(email));
      setVisible(!visible);
    }
  };

  return (
    <form
      className={cn(styles.form, className, {
        [styles.hidden]: !visible,
      })}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.title}>
        <Htag tag='h1'>Регистрация</Htag>
        <Link href={'/auth'}>
          <a className={styles.registration}>
            <P size='s' className={styles.registrationText}>
              Войти
            </P>
            <ButtonCircleIcon
              appearance='black'
              icon='right'
              className={styles.arrow}
            />
          </a>
        </Link>
      </div>

      <Field
        {...register('name', { required: 'Имя необходимо!' })}
        title='Имя'
        placeholder='Введите имя'
        error={errors.name}
        className='mb-[20px] md:mb-[50px]'
      />

      <div className={styles.group}>
        <Field
          {...register('login', { required: 'Логин необходим!' })}
          title='Логин'
          placeholder='Введите логин'
          error={errors.login}
          className='mb-[20px]'
        />
        <Field
          {...register('email', {
            required: 'Почта необходима!',
            pattern: {
              value: validEmail,
              message: 'Пожалуйста введите корректный адрес',
            },
          })}
          title='Почта'
          placeholder='Введите почту'
          error={errors.email}
          className='mb-[20px]'
        />
      </div>

      <div className={styles.group}>
        <Field
          {...register('password', {
            required: 'Продублируйте пароль!',
            minLength: {
              value: 4,
              message: 'Минимальная длинна пароля 4 символа',
            },
          })}
          title='Пароль'
          placeholder='Введите пароль'
          error={errors.password}
          className='mb-[20px] md:mb-[0px]'
        />
        <Field
          {...register('passwordCheck', {
            required: 'Продублируйте пароль!',
            minLength: {
              value: 4,
              message: 'Минимальная длинна пароля 4 символа',
            },
          })}
          title='Повторите пароль'
          placeholder='Продублируйте пароль'
          error={errors.passwordCheck}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          appearance='blackWhite'
          size='l'
          disabled={!isDirty || !isValid}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default LoginFormStepOne;
