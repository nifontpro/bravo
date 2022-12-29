import Meta from '@/core/utils/meta/Meta';
import React, { useState } from 'react';
import styles from './Login.module.scss';
import { LoginProps } from './Login.props';
import LogoIcon from '@/core/presenter/images/logoAuth.svg';
import { SubmitHandler } from 'react-hook-form';
import { ILoginInput } from '@/auth/model/auth.interface';
import { useAuthRedirect } from '../useAuthRedirect';
import cn from 'classnames';
import LoginFormStepOne from './LoginFormStepOne/LoginFormStepOne';
import LoginFormStepTwo from './LoginFormStepTwo/LoginFormStepTwo';
import SendUs from '../../../core/presenter/ui/SendUs/SendUs';

const LoginAuth = ({ className, ...props }: LoginProps): JSX.Element => {
  useAuthRedirect();

  const [visible, setVisible] = useState<boolean>(true);

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

        <LoginFormStepOne visible={visible} setVisible={setVisible} />
        <LoginFormStepTwo visible={visible} setVisible={setVisible} />

        <SendUs />
      </section>
    </Meta>
  );
};

export default LoginAuth;
