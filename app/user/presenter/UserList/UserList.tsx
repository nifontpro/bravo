import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserListprops';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import { useUserAdmin } from '../admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl, getUserUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

const UserList = ({
  user,
  className,
  children,
  ...props
}: UserListProps): JSX.Element => {
  const { push } = useRouter();
  const { deleteAsync } = useUserAdmin();

  return (
    <div className={cn(className, styles.container)} {...props}>
      <UserPreview user={user} className={styles.user} forWhat='user' onClick={() => push(getUserUrl(`/${user.id}`))}/> 
      {/* {user.departmentName == undefined ? (
        <P className={styles.department}>Отдел не найден</P>
      ) : (
        <P className={styles.department}>{user.departmentName}</P>
      )} */}
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
};
export default UserList;
