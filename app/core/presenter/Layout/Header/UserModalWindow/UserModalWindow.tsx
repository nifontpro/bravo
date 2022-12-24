import styles from './UserModalWindow.module.scss';
import { UserModalWindowProps } from './UserModalWindow.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ProfileIcon from '@/core/presenter/images/profile.svg';
import EditIcon from '@/core/presenter/images/editProfile.svg';
import ExitIcon from '@/core/presenter/images/exit.svg';
import ChangePasswordIcon from '@/core/presenter/images/changePassword.svg';
import P from '@/core/presenter/ui/P/P';
import { useRouter } from 'next/router';
import {
  getUserEditPasswordUrl,
  getUserEditUrl,
  getUserUrl,
} from '@/core/config/api.config';
import { useDispatch } from 'react-redux';
import { authActions } from '@/auth/data/auth.slice';
import { companyActions } from '@/company/data/company.slice';
import { departmentActions } from '@/department/data/department.slice';
import { companyApi } from '@/company/data/company.api';
import { departmentApi } from '@/department/data/department.api';
import { userApi } from '@/user/data/user.api';
import { ForwardedRef, forwardRef } from 'react';

const UserModalWindow = forwardRef(
  (
    {
      visibleModal,
      setVisibleModal,
      user,
      className,
      ...props
    }: UserModalWindowProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const handleClickProfile = () => {
      push(getUserUrl(`/${user?.id}`));
      setVisibleModal(false);
    };

    const handleClickEditProfile = () => {
      push(getUserEditUrl(`/${user?.id}`));
      setVisibleModal(false);
    };

    const handleClickEditPassword = () => {
      push(getUserEditPasswordUrl(`/${user?.id}`));
      setVisibleModal(false);
    };

    const handleLogout = () => {
      dispatch(authActions.logout());
      dispatch(companyActions.clear());
      dispatch(departmentActions.clear());
      dispatch(companyApi.util.resetApiState());
      dispatch(departmentApi.util.resetApiState());
      dispatch(userApi.util.resetApiState());
      // dispatch(userApi.util.invalidateTags(['User']))
      push('/auth');
    };

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

UserModalWindow.displayName = 'UserModalWindow';
export default UserModalWindow;
