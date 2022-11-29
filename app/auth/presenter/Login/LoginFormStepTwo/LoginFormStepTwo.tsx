import React, { useEffect, useState } from 'react';
import styles from './LoginFormStepTwo.module.scss';
import { LoginFormStepTwoProps } from './LoginFormStepTwo.props';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import Field from '@/core/presenter/ui/form/Field/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthRedirect } from '../../useAuthRedirect';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { authApi } from '@/auth/data/auth.api';
import { useSetAuthData } from '../../useSetAuthData';
import { toastError } from '@/core/utils/toast-error';
import { toast } from 'react-toastify';
import { useLoginState } from '@/auth/data/login.slice';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const LoginFormStepTwo = ({
  visible,
  setVisible,
  className,
  ...props
}: LoginFormStepTwoProps): JSX.Element => {
  useAuthRedirect();
  const { push } = useRouter();

  const { email } = useLoginState();

  const [registerStepTwo] = authApi.useRegisterStepTwoMutation();
  const { setAuthData } = useSetAuthData();

  useEffect(() => {
    setValue('email', email);
  }, [email]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<{ code: string; email: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{
    code: string;
    email: string;
  }> = async (data) => {
    console.log(data);
    registerStepTwo({ ...data})
      .unwrap()
      .then((d) => {
        setAuthData(d);
        toast.success('Вы успешно зарегистрированы!');
      })
      .catch((e) => {
        toastError(e, 'Ошибка регистрации');
      });
    setVisible(!visible);
    push('/auth');
  };

  return (
    <form
      className={cn(styles.form, className, {
        [styles.hidden]: visible,
      })}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ButtonCircleIcon
        onClick={() => setVisible(!visible)}
        appearance='black'
        icon='down'
        className={styles.back}
      >
        Вернуться назад
      </ButtonCircleIcon>
      <Htag tag='h1' className={styles.title}>
        Регистрация
      </Htag>

      <Field
        {...register('code', { required: 'Код необходим!' })}
        title={`Введите код из письма, которое мы отправили на ${email}`}
        placeholder='Введите код подтверждения'
        error={errors.code}
        type='password'
      />

      <div className={styles.buttons}>
        <Button
          appearance='blackWhite'
          size='l'
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default LoginFormStepTwo;
