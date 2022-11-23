import { FC } from 'react';
import Meta from '@/core/utils/meta/Meta';
import Heading from '@/core/presenter/ui/heading/Heading';
import Catalog from '@/core/presenter/ui/catalog/Catalog';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Search from '@/core/presenter/ui/Search/Search';
import styles from './Users.module.scss'
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';

const Users: FC = () => {
  const { users, isLoading } = useMyUser('');

  console.log(users);

  return (
    <Meta title='Сотрудники'>
      {/* <Heading title={`Вы и Ваши сотрудники`}/> */}

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className={styles.container}>
          <Search
		  	color='white'
            search={true}
            button={false}
            placeholder='Сотрудник сотрудника ...'
          />
		  <SortButton className={styles.filter}>По алфавиту А -- Я</SortButton>
        </div>

        // <Catalog
        //   data={users || []}
        //   prefix='/user'
        //   title='Сотрудники'
        //   description={`Список сотрудников`}
        // />
      )}
    </Meta>
  );
};

export default Users;
