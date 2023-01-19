import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from '@/core/presenter/images/logo.svg';
import Link from 'next/link';
import Search from '../../ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import { messageApi } from 'message/data/message.api';
import UserLogo from './UserLogo/UserLogo';
import Notification from './Notification/Notification';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const { data: allMessage } = messageApi.useGetByUserQuery(user?.id || '', {
    skip: !user?.id,
  });

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Link href='/'>
        <a>
          <LogoIcon className={styles.logo} />
        </a>
      </Link>
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
    </header>
  );
};

export default Header;
