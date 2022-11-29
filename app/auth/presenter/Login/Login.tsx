import Meta from '@/core/utils/meta/Meta';
import React, { useState } from 'react';
import styles from './Login.module.scss';
import SendUsIcon from '../sendUs.svg';
import { LoginProps } from './Login.props';
import LogoIcon from '../logo.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import P from '@/core/presenter/ui/P/P';
import Field from '@/core/presenter/ui/form/Field/Field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput, ILoginInput } from '@/auth/model/auth.interface';
import { useAuthRedirect } from '../useAuthRedirect';
import { validEmail } from '@/core/utils/regex';
import cn from 'classnames';
import LoginFormStepOne from './LoginFormStepOne/LoginFormStepOne';
import LoginFormStepTwo from './LoginFormStepTwo/LoginFormStepTwo';

const LoginAuth = ({ className, ...props }: LoginProps): JSX.Element => {
  useAuthRedirect();

  const [visible, setVisible] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ILoginInput>({ mode: 'onChange' });

  const onSubmitOne: SubmitHandler<ILoginInput> = async (data) => {
    console.log(data);
    setVisible(!visible);
  };

  const onSubmitTwo: SubmitHandler<ILoginInput> = async (data) => {
    console.log(data);
    setVisible(!visible);
  };

  return (
    <Meta title='Login'>
      <section className={cn(styles.wrapper, className)} {...props}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <LoginFormStepOne visible={visible} setVisible={setVisible}/>
        <LoginFormStepTwo visible={visible} setVisible={setVisible}/>

        <a href='mailto:example@htmlbook.ru' className={styles.sendUs}>
          <SendUsIcon className={styles.sendIcon} />
          <P>Написать нам</P>
        </a>
      </section>
    </Meta>
  );
};

export default LoginAuth;
