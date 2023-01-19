import { FC, useState } from 'react';
import { useAuthRedirect } from '@/auth/presenter/useAuthRedirect';
import styles from '@/auth/presenter/Auth.module.scss';
import Meta from '@/core/utils/meta/Meta';
import LogoIcon from '@/core/presenter/images/logoAuth.svg';
import SingIn from './SingIn/SingIn';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';
import SendUs from '../../core/presenter/ui/SendUs/SendUs';

const Auth: FC = () => {
  useAuthRedirect();

  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Meta title='Auth'>
      <section className={styles.wrapper}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <SingIn visible={visible} setVisible={setVisible} />
        <PasswordRecovery visible={visible} setVisible={setVisible} />

        <SendUs />
      </section>
    </Meta>
  );
};

export default Auth;
