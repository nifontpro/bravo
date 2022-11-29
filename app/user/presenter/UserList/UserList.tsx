import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserListprops';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import EditIcon from '../../../department/presenter/SingleDepartments/Depart/ListUsers/editUser.svg';
import RemoveIcon from '../../../department/presenter/SingleDepartments/Depart/ListUsers/removeUser.svg';
import P from '@/core/presenter/ui/P/P';
import { useUserAdmin } from '../admin/useUserAdmin';
import { useRouter } from 'next/router';

const UserList = ({
  user,
  className,
  children,
  ...props
}: UserListProps): JSX.Element => {

  const { push } = useRouter()
	const {deleteAsync} = useUserAdmin()

  return (
    <div className={cn(className, styles.container)} {...props}>
      <UserPreview user={user} />
      {user.departmentId == undefined ? (
        <P className={styles.department}>Отдел не найден</P>
      ) : (
        <P className={styles.department}>{user.departmentId}</P>
      )}
      <div className={styles.editPanel} {...props}>
        <EditIcon
          onClick={() => push('/manage/user/edit/' + user.id)}
          className='cursor-pointer'
        />
        <RemoveIcon
          onClick={() => deleteAsync(user.id)}
          className='ml-[5px] cursor-pointer'
        />
      </div>
    </div>
  );
};
export default UserList;
