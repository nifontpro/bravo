import { FC, useState } from 'react';
import { useAuthRedirect } from '@/auth/presenter/useAuthRedirect';
import styles from '@/auth/presenter/Auth.module.scss';
import Meta from '@/core/utils/meta/Meta';
import LogoIcon from '@/core/presenter/images/logoAuth.svg';
import P from '@/core/presenter/ui/P/P';
import SendUsIcon from '@/core/presenter/images/sendUs.svg';
import SingIn from './SingIn/SingIn';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';

const Auth: FC = () => {
  useAuthRedirect();

  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Meta title='Auth'>
      <section className={styles.wrapper}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <SingIn visible={visible} setVisible={setVisible}/>
        <PasswordRecovery visible={visible} setVisible={setVisible}/>

        <a href='mailto:example@htmlbook.ru' className={styles.sendUs}>
          <SendUsIcon className={styles.sendIcon} />
          <P>Написать нам</P>
        </a>
      </section>
    </Meta>
  );
};

export default Auth;
