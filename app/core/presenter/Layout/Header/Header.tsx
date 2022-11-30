import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from './logo.svg';
import NotificationIcon from './notification.svg';
import Link from 'next/link';
import Search from '../../ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import { ImageDefault } from '../../ui/icons/ImageDefault';
import LogoutButton from '../Navigation/MenuContainer/auth/LogoutButton';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Link href='/'>
        <LogoIcon className={styles.logo} />
      </Link>
      <Search
        color='gray'
        search={true}
        button={true}
        placeholder='Сотрудник, отдел, медаль...'
        className={styles.search}
      />
      <div className={styles.user}>
        <div className={styles.userComponent}>
          <NotificationIcon className={styles.notification}/>
        </div>
        <Link href={'/user/' + user?.id}>
          <ImageDefault
            src={user?.imageUrl}
            width={64}
            height={64}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
