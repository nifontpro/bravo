import { FC, useState } from 'react';
import { useAuthRedirect } from '@/auth/presenter/useAuthRedirect';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput } from '@/auth/model/auth.interface';
import styles from '@/auth/presenter/Auth.module.scss';
import Meta from '@/core/utils/meta/Meta';
import AuthFields from '@/auth/presenter/AuthFields';
// import Button from '@/core/presenter/ui/form/Button';
import { authApi } from '@/auth/data/auth.api';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useSetAuthData } from '@/auth/presenter/useSetAuthData';
import LogoIcon from './logo.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';

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
    } else if (type === 'register') {
      register(data)
        .unwrap()
        .then((d) => {
          setAuthData(d);
          toast.success('Вы успешно зарегистрированы!');
        })
        .catch((e) => {
          toastError(e, 'Ошибка регистрации');
        });
    }
    // reset()
  };

  return (
    <Meta title='Auth'>
      <section className={styles.wrapper}>

        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Htag tag='h1' className={styles.title}>Вход</Htag>
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
            {/* <Button
              type='submit'
              onClick={() => setType('register')}
              disabled={isLoading}
            >
              Регистрация
            </Button> */}
          </div>
        </form>
      </section>
    </Meta>
  );
};

export default Auth;
