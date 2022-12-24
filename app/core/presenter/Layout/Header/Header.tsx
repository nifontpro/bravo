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
import { useRef, useState } from 'react';
import UserModalWindow from './UserModalWindow/UserModalWindow';
import useOutsideClick from '@/core/hooks/useOutsideClick';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

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

        <div
          className={styles.userImg}
          onClick={() => setVisibleModal(!visibleModal)}
          ref={refOpen}
        >
          <ImageDefault
            src={user?.imageUrl}
            width={64}
            height={64}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </div>
      </div>
      <UserModalWindow
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        user={user}
        ref={ref}
      />
    </header>
  );
};

export default Header;
