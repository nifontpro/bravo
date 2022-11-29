import Meta from '@/core/utils/meta/Meta';
import React, { useState } from 'react';
import styles from './LoginFormStepOne.module.scss';
import SendUsIcon from '../sendUs.svg';
import { LoginFormStepOneProps } from './LoginFormStepOne.props';
import LogoIcon from '../logo.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import P from '@/core/presenter/ui/P/P';
import Field from '@/core/presenter/ui/form/Field/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput, ILoginInput } from '@/auth/model/auth.interface';
import { useAuthRedirect } from '../../useAuthRedirect';
import { validEmail } from '@/core/utils/regex';
import cn from 'classnames';

const LoginFormStepOne = ({
  visible,
  setVisible,
  className,
  ...props
}: LoginFormStepOneProps): JSX.Element => {
  useAuthRedirect();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ILoginInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    console.log(data);
    setVisible(!visible);
  };

  return (
    <form
      className={cn(styles.formOne, className, {
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
          })}
          title='Пароль'
          placeholder='Введите пароль'
          error={errors.password}
        />
        <Field
          {...register('passwordСheck', {
            required: 'Продублируйте пароль!',
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
        <Button
          appearance='blackWhite'
          size='l'
          // onClick={() => setType('login')}
          // disabled={isLoading}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default LoginFormStepOne;
