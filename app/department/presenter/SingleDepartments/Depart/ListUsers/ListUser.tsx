import styles from './ListUser.module.scss';
import cn from 'classnames';
import { ListUserProps } from './ListUser.props';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';

const ListUser = ({
  listUserVisible,
  usersInDepartment,
  className,
  ...props
}: ListUserProps): JSX.Element => {

  return (
    <div className={styles.wrapper} {...props}>
      {usersInDepartment?.map((item) => {
        return <UserPreview key={item.login} user={item} />;
      })}
    </div>
  );
};
export default ListUser;
