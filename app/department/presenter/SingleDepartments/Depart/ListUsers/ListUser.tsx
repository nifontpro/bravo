import styles from './ListUser.module.scss';
import cn from 'classnames';
import { ListUserProps } from './ListUser.props';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import EditIcon from './editUser.svg';
import RemoveIcon from './removeUser.svg';
import { useUserAdmin } from '@/user/presenter/admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl } from '@/core/config/api.config';

const ListUser = ({
  listUserVisible,
  usersInDepartment,
  className,
  ...props
}: ListUserProps): JSX.Element => {
  const { push } = useRouter()
	const {deleteAsync} = useUserAdmin()

  return (
    <div {...props}>
      {usersInDepartment?.map((item) => {
        return (
          <div key={item.login} className={styles.container}>
            <UserPreview user={item} />
            <div className={styles.editPanel} {...props}>
              <EditIcon onClick={() => push(getUserEditUrl(`/${item.id}`) )} className='cursor-pointer'/>
              <RemoveIcon onClick={() => deleteAsync(item.id)} className='ml-[5px] cursor-pointer' />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ListUser;
