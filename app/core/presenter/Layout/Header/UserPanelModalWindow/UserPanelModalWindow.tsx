import styles from './UserPanelModalWindow.module.scss';
import { UserPanelModalWindowProps } from './UserPanelModalWindow.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ProfileIcon from '@/core/presenter/images/profile.svg';
import EditIcon from '@/core/presenter/images/editProfile.svg';
import ExitIcon from '@/core/presenter/images/exit.svg';
import ChangePasswordIcon from '@/core/presenter/images/changePassword.svg';
import P from '@/core/presenter/ui/P/P';
import { ForwardedRef, forwardRef } from 'react';
import { useUserPanelModalWindow } from './useUserPanelModalWindow';

const UserPanelModalWindow = forwardRef(
  (
    {
      visibleModal,
      setVisibleModal,
      user,
      className,
      ...props
    }: UserPanelModalWindowProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      handleClickProfile,
      handleClickEditProfile,
      handleClickEditPassword,
      handleLogout,
    } = useUserPanelModalWindow(setVisibleModal, user);

    return (
      <div
        className={cn(
          styles.userModalWindow,
          {
            [styles.hidden]: !visibleModal,
          },
          className
        )}
        {...props}
        ref={ref}
      >
        <Htag tag='h3' className={styles.title}>
          {user?.login}
        </Htag>
        <ul className={styles.list}>
          <li className={styles.item} onClick={handleClickProfile}>
            <ProfileIcon />
            <P size='xs' fontstyle='thin' className={styles.link}>
              Мой профиль
            </P>
          </li>
          <li className={styles.item} onClick={handleClickEditProfile}>
            <EditIcon />
            <P size='xs' fontstyle='thin' className={styles.link}>
              Редактировать
            </P>
          </li>
          <li className={styles.item} onClick={handleClickEditPassword}>
            <ChangePasswordIcon />
            <P size='xs' fontstyle='thin' className={styles.link}>
              Сменить пароль
            </P>
          </li>
          <li className={styles.item} onClick={handleLogout}>
            <ExitIcon />
            <P size='xs' fontstyle='thin' className={styles.link}>
              Выйти
            </P>
          </li>
        </ul>
      </div>
    );
  }
);

UserPanelModalWindow.displayName = 'UserPanelModalWindow';
export default UserPanelModalWindow;
