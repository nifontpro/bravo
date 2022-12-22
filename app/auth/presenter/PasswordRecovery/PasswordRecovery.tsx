import React, { MouseEventHandler, useState } from 'react';
import styles from './PasswordRecovery.module.scss';
import { PasswordRecoveryProps } from './PasswordRecovery.props';
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
import Field from '@/core/presenter/ui/form/Field/Field';
import { validEmail } from '@/core/utils/regex';

const PasswordRecovery = ({
  className,
  visible,
  setVisible,
  ...props
}: PasswordRecoveryProps): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<{ code: string; email: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{ code: string; email: string; }> = (data) => {
    console.log(data);
    // login(data)
    //   .unwrap()
    //   .then((d) => {
    //     setAuthData(d);
    //     toast.success('Добро пожаловать!');
    //   })
    //   .catch((e) => {
    //     toastError(e, 'Ошибка входа');
    //   });
  };

  return (
    <div
      className={cn(
        styles.form,
        {
          [styles.hidden]: visible,
        },
        className
      )}
      {...props}
    >
      <div className={styles.title}>
        <div className={styles.registration} onClick={() => setVisible(true)}>
          <ButtonCircleIcon
            appearance='black'
            icon='right'
            className={styles.arrow}
          />
          <P size='s'>Назад</P>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...register('email', {
            required: 'Почта необходима!',
            pattern: {
              value: validEmail,
              message: 'Пожалуйста введите корректный адрес',
            },
          })}
          title={`Укажите ваш email, мы пришлем ссылку для восстановления пароля.`}
          placeholder='Введите email для восстановления пароля'
          error={errors.code}
          type='email'
        />

        <div className={styles.buttons}>
          <Button appearance='blackWhite' size='l'>
            Восстановить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecovery;
