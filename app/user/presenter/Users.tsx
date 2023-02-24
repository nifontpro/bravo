import { FC, useState } from 'react';
import Meta from '@/core/utils/meta/Meta';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Search from '@/core/presenter/ui/Search/Search';
import styles from './Users.module.scss';
import UserList from './UserList/UserList';
import Htag from '@/core/presenter/ui/Htag/Htag';
import cn from 'classnames';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { getUserCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const Users: FC = () => {
  const { users } = useMyUser('');
  const { push } = useRouter();

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
        <>
          <AuthComponent minRole={'director'}>
            <div
              className={styles.newUser}
              onClick={() => push(getUserCreateUrl())}
            >
              <ButtonCircleIcon
                icon='plus'
                appearance='black'
                className={styles.newUserBtn}
              >
                Сотрудник
              </ButtonCircleIcon>
            </div>
          </AuthComponent>

          <div className={styles.container}>
            <div className={styles.header}>
              <Htag tag='h3' className={cn(styles.choices)}>
                Сотрудники
              </Htag>
              <SortButton
                state={state}
                onClick={() => (state == 1 ? setState(-1) : setState(1))}
                className={styles.filter}
              >
                По алфавиту {state == 1 ? 'А -- Я' : 'Я -- А'}
              </SortButton>
            </div>

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
              className={styles.filterMedia}
            >
              По алфавиту {state == 1 ? 'А -- Я' : 'Я -- А'}
            </SortButton>

            {filteredValue.map((user) => {
              return (
                <UserList
                  layout
                  key={user.id}
                  user={user}
                  className={styles.userList}
                />
              );
            })}
          </div>
        </>
      )}
    </Meta>
  );
};

export default Users;
