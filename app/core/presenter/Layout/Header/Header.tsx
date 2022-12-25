import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from '@/core/presenter/images/logo.svg';
import NotificationIcon from '@/core/presenter/images/notification.svg';
import Link from 'next/link';
import Search from '../../ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import { ImageDefault } from '../../ui/icons/ImageDefault';
import { useRef, useState } from 'react';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import UserPanelModalWindow from './UserPanelModalWindow/UserPanelModalWindow';
import NotificationModalWindow from './NotificationModalWindow/NotificationModalWindow';
import { messageApi } from 'message/data/message.api';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { user } = useAuthState();
  const { data: allMessage } = messageApi.useGetByUserQuery(user?.id || '', {skip: !user?.id});

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);

  //Закрытие модального окна уведомлений нажатием вне
  const refNotification = useRef(null);
  const refOpenNotification = useRef(null);
  const handleClickOutsideNotification = () => {
    setVisibleNotification(false);
  };
  useOutsideClick(
    refNotification,
    refOpenNotification,
    handleClickOutsideNotification,
    visibleNotification
  );

  //Закрытие модального окна пользователя нажатием вне
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
        <div
          className={styles.userComponent}
          ref={refOpenNotification}
          onClick={() => setVisibleNotification(!visibleNotification)}
        >
          <NotificationIcon className={styles.notification}/>
          <div className={styles.notificationCount}>{allMessage?.filter(item => item.read == false).length}</div>
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
      <UserPanelModalWindow
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        user={user}
        ref={ref}
      />
      <NotificationModalWindow
        visibleModal={visibleNotification}
        setVisibleModal={setVisibleNotification}
        message={allMessage}
        ref={refNotification}
      />
    </header>
  );
};

export default Header;
