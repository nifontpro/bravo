import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from '@/core/presenter/images/logo.svg';
import Search from '../../ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import { messageApi } from 'message/data/message.api';
import UserLogo from './UserLogo/UserLogo';
import Notification from './Notification/Notification';
import MenuIcon from '@/core/presenter/images/menu.svg';
import { useRouter } from 'next/router';
import Navigation from '../Navigation/Navigation';
import { useState } from 'react';
import { useWindowSize } from '@/core/hooks/useWindowSize';

const Header = ({ setNavigationVisible, navigationVisible, className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const { push } = useRouter();
  const { windowSize } = useWindowSize()

  const { data: allMessage } = messageApi.useGetByUserQuery(user?.id || '', {
    skip: !user?.id,
  });

  return (
    <header className={cn(className, styles.header)} {...props}>
      <MenuIcon className={styles.menu} onClick={() => setNavigationVisible(!navigationVisible)}/>
      <LogoIcon className={styles.logo} onClick={() => push('/')} />
      <Search
        color='gray'
        search={true}
        button={false}
        placeholder='Сотрудник, отдел, медаль...'
        className={styles.search}
      />
      <div className={styles.user}>
        <Notification allMessage={allMessage} />
        <UserLogo user={user} className={styles.userImg} />
      </div>
      <Navigation
      setNavigationVisible={setNavigationVisible}
        className={cn({
          [styles.navigationVisible]: navigationVisible,
          [styles.navigationHidden]: !navigationVisible || windowSize.winWidth > 1700,
        })}
      />
    </header>
  );
};

export default Header;
