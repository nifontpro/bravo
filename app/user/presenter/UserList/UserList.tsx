import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserListprops';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import EditIcon from '@/core/presenter/images/edit.svg';
import RemoveIcon from '@/core/presenter/images/remove.svg';
import P from '@/core/presenter/ui/P/P';
import { useUserAdmin } from '../admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

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
      <UserPreview user={user} className={styles.user} forWhat='user'/>
      {/* {user.departmentName == undefined ? (
        <P className={styles.department}>Отдел не найден</P>
      ) : (
        <P className={styles.department}>{user.departmentName}</P>
      )} */}
      <AuthComponent minRole={'director'}>
        <div className={styles.editPanel} {...props}>
          <EditIcon
            onClick={() => push(getUserEditUrl(`/${user.id}`))}
            className='cursor-pointer'
          />
          <RemoveIcon
            onClick={() => deleteAsync(user.id)}
            className='ml-[5px] cursor-pointer'
          />
        </div>
      </AuthComponent>
    </div>
  );
};
export default UserList;
