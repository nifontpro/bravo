import { FC, useState } from 'react';
import { useAuthRedirect } from '@/auth/presenter/useAuthRedirect';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '@/auth/presenter/Auth.module.scss';
import Meta from '@/core/utils/meta/Meta';
import AuthFields from '@/auth/presenter/AuthFields';
import { authApi } from '@/auth/data/auth.api';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useSetAuthData } from '@/auth/presenter/useSetAuthData';
import LogoIcon from '@/core/presenter/images/logoAuth.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import P from '@/core/presenter/ui/P/P';
import SendUsIcon from '@/core/presenter/images/sendUs.svg';
import Link from 'next/link';
import { IAuthInput } from '../model/auth.interface';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const Auth: FC = () => {
  useAuthRedirect();

  const { setAuthData } = useSetAuthData();

  const [login, { isLoading }] = authApi.useLoginMutation();
  const [register] = authApi.useRegisterMutation();

  const [type, setType] = useState<'login' | 'register'>('login');
  const {
    register: registerInput,
    handleSubmit,
    formState,
  } = useForm<IAuthInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    if (type === 'login') {
      login(data)
        .unwrap()
        .then((d) => {
          setAuthData(d);
          toast.success('Добро пожаловать!');
        })
        .catch((e) => {
          toastError(e, 'Ошибка входа');
        });
    }
  };

  return (
    <Meta title='Auth'>
      <section className={styles.wrapper}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          <AuthFields
            formState={formState}
            register={registerInput}
            isPasswordRequired
          />

          <div className={styles.buttons}>
            <Button
              appearance='blackWhite'
              size='l'
              onClick={() => setType('login')}
              disabled={isLoading}
            >
              Продолжить
            </Button>
          </div>
          <Link href={'/'}>
            <a className='flex justify-center'>
              <P size='m' color='gray' fontstyle='thin' className={styles.auth}>
                Забыли пароль?
              </P>
            </a>
          </Link>
        </form>

        <a href='mailto:example@htmlbook.ru' className={styles.sendUs}>
          <SendUsIcon className={styles.sendIcon} />
          <P>Написать нам</P>
        </a>
      </section>
    </Meta>
  );
};

export default Auth;
