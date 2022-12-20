import styles from './ListUser.module.scss';
import cn from 'classnames';
import { ListUserProps } from './ListUser.props';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import EditIcon from '@/core/presenter/images/edit.svg';
import RemoveIcon from '@/core/presenter/images/remove.svg';
import { useUserAdmin } from '@/user/presenter/admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const ListUser = ({
  listUserVisible,
  usersInDepartment,
  className,
  ...props
}: ListUserProps): JSX.Element => {
  const { push } = useRouter();
  const { deleteAsync } = useUserAdmin();

  return (
    <div {...props}>
      {usersInDepartment?.map((item) => {
        return (
          <div key={item.login} className={styles.container}>
            <UserPreview user={item} forWhat='depart'/>
            <AuthComponent minRole={'director'}>
              <div className={styles.editPanel} {...props}>
                <EditIcon
                  onClick={() => push(getUserEditUrl(`/${item.id}`))}
                  className='cursor-pointer'
                />
                <RemoveIcon
                  onClick={() => deleteAsync(item.id)}
                  className='ml-[5px] cursor-pointer'
                />
              </div>
            </AuthComponent>
          </div>
        );
      })}
    </div>
  );
};
export default ListUser;
