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
import { IUser } from '@/user/model/user.types';
import { declOfNum } from '@/core/utils/declOfNum';

const ChoiceUsers = ({
  className,
  ...props
}: ChoiceUsersProps): JSX.Element => {

  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false)
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([])

  const { users } = useMyUser('');
  let arrUsers = [...users];

  const handleChoiceAllUsers = () => {
    setAllChecked(!allChecked)
    setVisibleCheckbox(!visibleCheckbox)
    if (!allChecked && arrChoiceUser.length != users.length) {
      let arr: string[] = []
      users.forEach(item => arr.push(item.id))
      setArrChoiceUser(arr)
    }
    if (allChecked) {
      setArrChoiceUser([])
    }
  }

  console.log(arrChoiceUser)

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
            Выбрано {arrChoiceUser.length}{' '}
            {declOfNum(arrChoiceUser.length, [
              'сотрудник',
              'сотрудника',
              'сотрудников',
            ])}
          </P>

        <Checkbox setVisibleCheckbox={setVisibleCheckbox} visibleCheckbox={visibleCheckbox} icon='check' onClick={handleChoiceAllUsers}>
          <P size='s' fontstyle='thin'>
            Выбрать всех
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {arrUsers.map((user) => {
          return <UserList arrChoiceUser={arrChoiceUser} setArrChoiceUser={setArrChoiceUser} key={user.id} user={user} setVisibleCheckbox={setVisibleCheckbox} allChecked={allChecked}/>;
        })}
      </div>
    </div>
  );
};

export default ChoiceUsers;
