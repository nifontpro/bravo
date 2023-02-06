import React from 'react';
import styles from './PasswordRecovery.module.scss';
import { PasswordRecoveryProps } from './PasswordRecovery.props';
import cn from 'classnames';
import Button from '@/core/presenter/ui/Button/Button';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import P from '@/core/presenter/ui/P/P';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import Field from '@/core/presenter/ui/form/Field/Field';
import { validEmail } from '@/core/utils/regex';
import { registerApi } from 'register/data/register.api';

const PasswordRecovery = ({
  className,
  visible,
  setVisible,
  ...props
}: PasswordRecoveryProps): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<{ code: string; email: string }>({ mode: 'onChange' });

  const [ passwordReset ] = registerApi.usePasswordResetStepOneMutation();

  const onSubmit: SubmitHandler<{ email: string; }> = (data) => {
    let isError = false;

    passwordReset(data.email)
      .unwrap()
      .then((d) => {

        toast.success('Добро пожаловать!');
      })
      .catch((e) => {
        toastError(e, 'Ошибка входа');
      });
    
      if (!isError) {
        toast.success(`Проверьте адрес ${data.email}`);
        setVisible(true);
      }
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
          <P size='s' className={styles.registrationText}>Назад</P>
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
          placeholder='Введите email'
          error={errors.code}
          type='email'
        />

        <div className={styles.buttons}>
          <Button appearance='blackWhite' size='l' disabled={!isDirty || !isValid}>
            Восстановить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecovery;
