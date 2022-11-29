import Meta from '@/core/utils/meta/Meta';
import React, { useState } from 'react';
import styles from './LoginFormStepTwo.module.scss';
import SendUsIcon from '../sendUs.svg';
import { LoginFormStepTwoProps } from './LoginFormStepTwo.props';
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

const LoginFormStepTwo = ({
  visible,
  setVisible,
  className,
  ...props
}: LoginFormStepTwoProps): JSX.Element => {
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
        [styles.hidden]: visible,
      })}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Htag tag='h1' className={styles.title}>
        Регистрация
      </Htag>

      <Field
        {...register('passwordСheck', { required: 'Код необходим!' })}
        title='Пароль'
        placeholder='Введите код подтверждения'
        error={errors.passwordСheck}
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

export default LoginFormStepTwo;
