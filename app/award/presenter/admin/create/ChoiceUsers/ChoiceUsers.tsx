import styles from './ChoiceUsers.module.scss';
import { ChoiceUsersProps } from './ChoiceUsers.props';
import cn from 'classnames';
import Search from '@/core/presenter/ui/Search/Search';
import P from '@/core/presenter/ui/P/P';
import Checkbox from '@/core/presenter/ui/Checkbox/Checkbox';
import { useMyUser } from '@/user/presenter/useMyUsers';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import CheckedIcon from './checked.svg';
import UserList from './UserList/UserList';
import { useState } from 'react';

const ChoiceUsers = ({
  className,
  ...props
}: ChoiceUsersProps): JSX.Element => {

  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false)

  const { users } = useMyUser('');
  let arrUsers = [...users];

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P className={styles.searchTitle}>Поиск</P>
      <Search
        placeholder='Поиск сотрудника'
        button={false}
        search={true}
        color='white'
      />
      <div className={styles.searchPanel}>
        <P size='s' fontstyle='thin' color='gray'>
          Выбрано 2 сотрудника
        </P>
        <Checkbox setVisibleCheckbox={setVisibleCheckbox} visibleCheckbox={visibleCheckbox} icon='check' onClick={() => setAllChecked(!allChecked)}>
          <P size='s' fontstyle='thin'>
            Выбрать всех
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {arrUsers.map((user) => {
          return <UserList key={user.id} user={user} setVisibleCheckbox={setVisibleCheckbox} allChecked={allChecked}/>;
        })}
      </div>
    </div>
  );
};

export default ChoiceUsers;
