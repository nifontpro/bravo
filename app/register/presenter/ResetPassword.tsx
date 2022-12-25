import styles from './ResetPassword.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { ResetPasswordProps } from './ResetPassword.props';
import cn from 'classnames';
import LogoIcon from '@/core/presenter/images/logoAuth.svg';
import SendUsIcon from '@/core/presenter/images/sendUs.svg';
import P from '@/core/presenter/ui/P/P';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Field from '@/core/presenter/ui/form/Field/Field';
import Button from '@/core/presenter/ui/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toastError } from '@/core/utils/toast-error';
import { toast } from 'react-toastify';
import { registerApi } from 'register/data/register.api';
import { useResetPassword } from './useResetPassword';

const ResetPassword = ({
  router,
  className,
  ...props
}: ResetPasswordProps): JSX.Element => {
  // Token: {router.query.resetToken}
  // UserId: {router.query.userId}

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<{ userId: string; code: string; password: string }>({
    mode: 'onChange',
  });

  const { onSubmit } = useResetPassword(
    router,
    setValue,
  );

  return (
    <Meta title='Сброс пароля'>
      <section {...props} className={styles.wrapper}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <div className={cn(styles.form, className)} {...props}>
          <div className={styles.title}>
            <Htag tag='h1'>Восстановление пароля</Htag>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              {...register('password', {
                required: 'Пароль обязательно!',
                minLength: 6,
              })}
              title='Пароль'
              placeholder='Введите новый пароль'
              error={errors.password}
            />

            <div className={styles.buttons}>
              <Button appearance='blackWhite' size='l'>
                Продолжить
              </Button>
            </div>
          </form>
        </div>

        <a href='mailto:example@htmlbook.ru' className={styles.sendUs}>
          <SendUsIcon className={styles.sendIcon} />
          <P>Написать нам</P>
        </a>
      </section>
    </Meta>
  );
};

export default ResetPassword;
