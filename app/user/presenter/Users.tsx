import { FC, useEffect, useState } from 'react';
import Meta from '@/core/utils/meta/Meta';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Search from '@/core/presenter/ui/Search/Search';
import styles from './Users.module.scss';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import UserList from './UserList/UserList';
import { IUser } from '../model/user.types';

const Users: FC = () => {
  const { users } = useMyUser('');

  const [searchValue, setSearchValue] = useState<string>('');

  const filteredValue = users.filter((item) =>
    item.lastname?.toLowerCase().includes(searchValue)
  );

  //Сотртировка по фамилии
  const [state, setState] = useState<1 | -1>(1);
  if (filteredValue !== undefined) {
    filteredValue.sort((prev, next): number => {
      if (prev.lastname !== undefined && next.lastname !== undefined) {
        if (prev?.lastname > next?.lastname) return state; //(-1)
      }
      return 1;
    });
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Meta title='Сотрудники'>
      {users == undefined ? (
        <p>Загрузка...</p>
      ) : (
        <div className={styles.container}>
          <Search
            onChange={handleChange}
            color='white'
            search={true}
            button={false}
            placeholder='Сотрудник сотрудника ...'
          />
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.filter}
          >
            По алфавиту {state == 1 ? 'А -- Я' : 'Я -- А'}
          </SortButton>
          {filteredValue.map((user) => {
            return (
              <UserList key={user.id} user={user} className={styles.userList} />
            );
          })}
        </div>
      )}
    </Meta>
  );
};

export default Users;
