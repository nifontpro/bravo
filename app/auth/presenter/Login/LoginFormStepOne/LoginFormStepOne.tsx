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
    formState: { errors },
  } = useForm<ILoginInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    if (data.password !== data.passwordСheck) {
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
      <Htag tag='h1' className={styles.title}>
        Регистрация
      </Htag>

      <Field
        {...register('name', { required: 'Имя необходимо!' })}
        title='Имя'
        placeholder='Введите имя'
        error={errors.name}
        className='mb-[60px]'
      />

      <Field
        {...register('login', { required: 'Логин необходим!' })}
        title='Логин'
        placeholder='Введите логин'
        error={errors.login}
        className='mb-[60px]'
      />

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
        />
        <Field
          {...register('passwordСheck', {
            required: 'Продублируйте пароль!',
            minLength: {
              value: 4,
              message: 'Минимальная длинна пароля 4 символа',
            },
          })}
          title='Повторите пароль'
          placeholder='Продублируйте пароль'
          error={errors.passwordСheck}
        />
      </div>

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
        className='mb-[60px]'
      />

      <div className={styles.buttons}>
        <Button appearance='blackWhite' size='l'>
          Продолжить
        </Button>
      </div>
      <Link href={'/auth'}>
        <a className='flex justify-center'>
          <P size='m' color='gray' fontstyle='thin' className={styles.auth}>
            Уже зарегестрированны? Войти
          </P>
        </a>
      </Link>
    </form>
  );
};

export default LoginFormStepOne;
