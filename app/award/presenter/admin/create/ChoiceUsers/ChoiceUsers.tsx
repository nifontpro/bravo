import styles from './ChoiceUsers.module.scss';
import { ChoiceUsersProps } from './ChoiceUsers.props';
import cn from 'classnames';
import Search from '@/core/presenter/ui/Search/Search';
import P from '@/core/presenter/ui/P/P';
import Checkbox from '@/core/presenter/ui/Checkbox/Checkbox';
import UserList from './UserList/UserList';
import { useState } from 'react';
import { declOfNum } from '@/core/utils/declOfNum';

const ChoiceUsers = ({
  users,
  arrChoiceUser,
  setArrChoiceUser,
  className,
  ...props
}: ChoiceUsersProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  const filteredValue = users.filter((item) =>
    item.lastname?.toLowerCase().includes(searchValue)
  );

  const handleChoiceAllUsers = () => {
    setAllChecked(!allChecked);
    setVisibleCheckbox(!visibleCheckbox);
    if (!allChecked && arrChoiceUser.length != users.length) {
      let arr: string[] = [];
      users.forEach((item) => arr.push(item.id));
      setArrChoiceUser(arr);
      setSearchValue('');
    }
    if (allChecked) {
      setArrChoiceUser([]);
      setSearchValue('');
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Search
        onChange={handleChange}
        placeholder='Поиск сотрудника'
        button={false}
        search={true}
        color='white'
      />
      <div className={styles.searchPanel}>
        <P size='s' fontstyle='thin' color='gray' className={styles.countUsers}>
          Выбрано {arrChoiceUser.length}{' '}
          {declOfNum(arrChoiceUser.length, [
            'сотрудник',
            'сотрудника',
            'сотрудников',
          ])}
        </P>

        <Checkbox
          setVisibleCheckbox={setVisibleCheckbox}
          visibleCheckbox={visibleCheckbox}
          icon='check'
          onClick={handleChoiceAllUsers}
        >
          <P size='s' fontstyle='thin'>
            Выбрать всех
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {filteredValue?.map((user) => {
          return (
            <UserList
              arrChoiceUser={arrChoiceUser}
              setArrChoiceUser={setArrChoiceUser}
              key={user.id}
              user={user}
              setVisibleCheckbox={setVisibleCheckbox}
              allChecked={allChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceUsers;
