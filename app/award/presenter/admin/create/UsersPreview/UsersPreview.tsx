import styles from './UsersPreview.module.scss';
import { UsersPreviewProps } from './UsersPreview.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { IUser } from '@/user/model/user.types';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import { declOfNum } from '@/core/utils/declOfNum';
import Button from '@/core/presenter/ui/Button/Button';
import { useState } from 'react';
import ChoiceUsers from '../ChoiceUsers/ChoiceUsers';
import FilterCreate from '../FilterCreate/FilterCreate';

const UsersPreview = ({
  users,
  arrChoiceUser,
  setArrChoiceUser,
  className,
  ...props
}: UsersPreviewProps): JSX.Element => {
  const selectedUsers: IUser[] = [];
  users.forEach((user) => {
    arrChoiceUser.forEach((id) => {
      if (user.id == id) {
        selectedUsers.push(user);
      }
    });
  });

  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P className={styles.title}>Сотрудники</P>
      <P className={styles.countUsers} color='gray'>
        Выбрано {arrChoiceUser.length}{' '}
        {declOfNum(arrChoiceUser.length, [
          'сотрудник',
          'сотрудника',
          'сотрудников',
        ])}
      </P>
      {selectedUsers.map((user) => {
        return <UserPreview key={user.id} user={user} forWhat='user' className={styles.list}/>;
      })}

      <FilterCreate
        users={users}
        arrChoiceUser={arrChoiceUser}
        setArrChoiceUser={setArrChoiceUser}
      />
    </div>
  );
};

export default UsersPreview;
