import styles from './ListUser.module.scss';
import { ListUserProps } from './ListUser.props';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import { useUserAdmin } from '@/user/presenter/admin/useUserAdmin';
import { useRouter } from 'next/router';
import { getUserEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

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
            <UserPreview user={item} forWhat='depart' />
            <AuthComponent minRole={'director'}>
              <div className={styles.editPanel} {...props}>
                <div
                  className={styles.wrapperIcon}
                  onClick={() => push(getUserEditUrl(`/${item.id}`))}
                >
                  <ButtonEdit icon='edit' className={styles.edit} />
                </div>
                <div
                  className={styles.wrapperIcon}
                  onClick={() => deleteAsync(item.id)}
                >
                  <ButtonEdit icon='remove' className={styles.remove} />
                </div>
              </div>
            </AuthComponent>
          </div>
        );
      })}
    </div>
  );
};
export default ListUser;
