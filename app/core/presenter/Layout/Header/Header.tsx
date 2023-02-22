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
import { useWindowSize } from '@/core/hooks/useWindowSize';
import { useLayout } from '../useLayout';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const { push } = useRouter();
  const { windowSize } = useWindowSize();
  const { open, visibleNavigation } = useLayout();

  const { data: allMessage } = messageApi.useGetByUserQuery(user?.id || '', {
    skip: !user?.id,
  });

  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <MenuIcon className={styles.menu} onClick={open} />
      <LogoIcon className={styles.logo} onClick={() => push('/')} />
      <Search
        color='gray'
        search={true}
        button={false}
        placeholder='Поиск пока не работает...'
        className={styles.search}
      />
      <div className={styles.user}>
        <Notification allMessage={allMessage} />
        <UserLogo user={user} className={styles.userImg} />
      </div>
      <AnimatePresence mode='wait'>
        {visibleNavigation && windowSize.winWidth < 1700 ? (
          <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.4 }}
          className='z-[100]'
          >
            <Navigation
              className={styles.navigation}
            />
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
