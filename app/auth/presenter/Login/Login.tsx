import Meta from '@/core/utils/meta/Meta';
import React from 'react';
import styles from './Login.module.scss';
import SendUsIcon from '../sendUs.svg';
import { LoginProps } from './Login.props';
import LogoIcon from '../logo.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';
import AuthFields from '../AuthFields';
import Button from '@/core/presenter/ui/Button/Button';
import P from '@/core/presenter/ui/P/P';

const LoginAuth = ({ className, ...props }: LoginProps): JSX.Element => {
  return (
    <Meta title='Login'>
      <section>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Htag tag='h1' className={styles.title}>
            Вход
          </Htag>
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
        </form> */}

        <a href='mailto:example@htmlbook.ru' className={styles.sendUs}>
          <SendUsIcon className={styles.sendIcon} />
          <P>Написать нам</P>
        </a>
      </section>
    </Meta>
  );
};

export default LoginAuth;
