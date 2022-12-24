import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from '@/core/presenter/images/logo.svg';
import NotificationIcon from './notification.svg';
import Link from 'next/link';
import Search from '../../ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import { ImageDefault } from '../../ui/icons/ImageDefault';
import LogoutButton from '../Navigation/MenuContainer/auth/LogoutButton';
import { useState } from 'react';
import UserModalWindow from './UserModalWindow/UserModalWindow';
import { useOutside } from '@/core/hooks/useOutside';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  // const { ref, isShow, setIsShow } = useOutside(true)

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
        <div className={styles.userComponent}>
          <NotificationIcon className={styles.notification} />
        </div>
        {/* <Link href={'/user/' + user?.id}>
          <a> */}
        <div className={styles.userImg} onClick={() => setVisibleModal(!visibleModal)}>
          <ImageDefault
            src={user?.imageUrl}
            width={64}
            height={64}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </div>
        {/* <LogoutButton /> */}
      </div>
      <UserModalWindow visibleModal={visibleModal} setVisibleModal={setVisibleModal} user={user}/>
    </header>
  );
};

export default Header;
