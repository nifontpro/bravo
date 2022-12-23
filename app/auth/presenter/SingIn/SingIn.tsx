import React, { useState } from 'react';
import styles from './SingIn.module.scss';
import { SingInProps } from './SingIn.props';
import { useAuthRedirect } from '../useAuthRedirect';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Link from 'next/link';
import AuthFields from '../AuthFields';
import Button from '@/core/presenter/ui/Button/Button';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import P from '@/core/presenter/ui/P/P';
import { useSetAuthData } from '../useSetAuthData';
import { authApi } from '@/auth/data/auth.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput } from '@/auth/model/auth.interface';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';

const SingIn = ({
  className,
  visible,
  setVisible,
  ...props
}: SingInProps): JSX.Element => {
  useAuthRedirect();
  const { setAuthData } = useSetAuthData();

  const [login, { isLoading }] = authApi.useLoginMutation();
  const {
    register: registerInput,
    handleSubmit,
    formState,
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
            <P size='s'>Регистрация</P>
            <ButtonCircleIcon
              appearance='black'
              icon='right'
              className={styles.arrow}
            />
          </a>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFields
          formState={formState}
          register={registerInput}
          isPasswordRequired
        />

        <div className={styles.buttons}>
          <Button appearance='blackWhite' size='l' disabled={isLoading}>
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
