/* eslint-disable react/display-name */
import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserListprops';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import { useUserAdmin } from '../admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl, getUserUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

const UserList = motion(
  forwardRef(
    (
      { user, className, children, ...props }: UserListProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { push } = useRouter();
      const { deleteAsync } = useUserAdmin();

      return (
        <div ref={ref} className={cn(className, styles.container)} {...props}>
          <UserPreview
            user={user}
            className={styles.user}
            forWhat='user'
            onClick={() => push(getUserUrl(`/${user.id}`))}
          />
          <AuthComponent minRole={'director'}>
            <div className={styles.editPanel} {...props}>
              <ButtonEdit
                onClick={() => push(getUserEditUrl(`/${user.id}`))}
                icon='edit'
              />

              <ButtonEdit
                onClick={() => deleteAsync(user.id)}
                icon='remove'
                className='@apply ml-[5px]'
              />
            </div>
          </AuthComponent>
        </div>
      );
    }
  )
);

UserList.displayName = 'UserList';
export default UserList;
