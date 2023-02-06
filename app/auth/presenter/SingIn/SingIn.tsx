import React, { useState } from 'react';
import styles from './SingIn.module.scss';
import { SingInProps } from './SingIn.props';
import { useAuthRedirect } from '../useAuthRedirect';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Link from 'next/link';
import Button from '@/core/presenter/ui/Button/Button';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import P from '@/core/presenter/ui/P/P';
import { useSetAuthData } from '../useSetAuthData';
import { authApi } from '@/auth/data/auth.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput } from '@/auth/model/auth.interface';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import Field from '@/core/presenter/ui/form/Field/Field';
import EyeIcon from '@/core/presenter/images/eye.svg';

const SingIn = ({
  className,
  visible,
  setVisible,
  ...props
}: SingInProps): JSX.Element => {
  useAuthRedirect();
  const { setAuthData } = useSetAuthData();
  const [ typeInput, setTypeInput ] = useState<'password' | 'text'>('password')

  const [login, { isLoading }] = authApi.useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IAuthInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    login(data)
      .unwrap()
      .then((d) => {
        setAuthData(d);
        toast.success('Добро пожаловать!');
      })
      .catch((e) => {
        toastError(e, 'Ошибка входа');
      });
  };

  return (
    <div
      className={cn(
        styles.form,
        {
          [styles.hidden]: !visible,
        },
        className
      )}
      {...props}
    >
      <div className={styles.title}>
        <Htag tag='h1'>Вход</Htag>
        <Link href={'/login'}>
          <a className={styles.registration}>
            <P size='s' className={styles.registrationText}>
              Регистрация
            </P>
            <ButtonCircleIcon
              appearance='black'
              icon='right'
              className={styles.arrow}
            />
          </a>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          className='mb-[20px] md:mb-[50px]'
        />

        <div className={styles.containerEye}>
          <Field
            {...register('password', {
              required: 'Пароль обязательно',
              minLength: {
                value: 4,
                message: 'Минимальная длина пароля 4 символа',
              },
            })}
            placeholder='Введите пароль'
            title='Пароль' 
            type={ typeInput }
            error={errors.password}
          />
          <div className={styles.eye} onMouseOver={() => setTypeInput('text')} onMouseLeave={() => setTypeInput('password')}>
            <EyeIcon />
          </div>
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

      <P
        size='m'
        color='gray'
        fontstyle='thin'
        className={styles.passwordRecovery}
        onClick={() => setVisible(false)}
      >
        Забыли пароль?
      </P>
    </div>
  );
};

export default SingIn;
