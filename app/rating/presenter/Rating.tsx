import styles from './Rating.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { IOption } from '@/core/presenter/ui/SelectArtem/SelectArtem.interface';
import { useState } from 'react';
import ButtonToggle from '@/core/presenter/ui/ButtonToggle/ButtonToggle';
import UserListRating from './UserListRating/UserListRating';
import SelectCustom from '@/core/presenter/ui/SelectCustom/SelectCustom';
import { useDepartment } from '@/department/presenter/useDepartment';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Search from '@/core/presenter/ui/Search/Search';
import { useAuthState } from '@/auth/data/auth.slice';
import CurrentUser from './CurrentUser/CurrentUser';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';
import ButtonScrollUp from '@/core/presenter/ui/ButtonScrollUp/ButtonScrollUp';
import FilterRating from './FilterRating/FilterRating';

const Rating = ({ company, className, ...props }: RatingProps): JSX.Element => {
  const { user } = useAuthState();
  const [state, setState] = useState<1 | -1>(1);

  const { usersWithAwards: users } = useMyUser('');

  let currentUser = users.find((item) => {
    if (item.id != undefined) {
      return item.id == user?.id;
    }
  });

  let currentUserIndex = users.findIndex((item) => {
    if (item.id != undefined) {
      return item.id == user?.id;
    }
  });

  const { departmentInCompany: departments } = useDepartment('');
  let arrDeparts: IOption[] = [];
  departments?.forEach((item) => {
    arrDeparts.push({
      label: item.name,
      value: item.id,
    });
  });
  arrDeparts.unshift({
    label: 'Все отделы',
    value: '',
  });

  //Поиск по фамилии
  const [searchValue, setSearchValue] = useState<string>('');
  let filteredValue = users?.filter((user) =>
    user.lastname?.toLowerCase().includes(searchValue)
  );
  //Сортировка по кол.наград
  const [sortAward, setSortAward] = useState<boolean>(false);
  const [departSort, setDepartSort] = useState<string>('');
  if (filteredValue !== undefined) {
    filteredValue.sort((prev, next): number => {
      if (prev.awards !== undefined && next.awards !== undefined) {
        if (prev.awards.length < next.awards.length) return state; //(-1)
      }
      return 1;
    });
    //Сортировка по отделам
    filteredValue = filteredValue.filter((user) =>
      user.departmentId?.includes(departSort)
    );
    //Фильтр по наградам
    if (!sortAward) {
      filteredValue = filteredValue.filter((user) =>
        user.awards.find((item) => item.state == 'AWARD')
      );
    } else {
      filteredValue = filteredValue.filter((user) => user.awardCount >= 0);
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Meta title='Рейтинг'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h1'>Рейтинг</Htag>
        <div className={cn(styles.header, styles.headerUser)}>
          <SelectCustom
            placeholder={'Все отделы'}
            className={styles.selectDepartment}
            options={arrDeparts}
            setDepartSort={setDepartSort}
          />
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            По количеству наград
          </SortButton>
          <ButtonToggle setSortAward={setSortAward} className={styles.toogle} />
        </div>

        <FilterRating
          departments={departments}
          departSort={departSort}
          setDepartSort={setDepartSort}
          state={state}
          setState={setState}
          sortAward={sortAward}
          setSortAward={setSortAward}
        />

        {currentUser && (
          <CurrentUser
            currentUser={currentUser}
            currentUserIndex={currentUserIndex}
          />
        )}

        <div className={styles.usersListRating}>
          <Search
            onChange={handleChange}
            color='white'
            search={true}
            button={false}
            placeholder='Поиск сотрудника ...'
            className={styles.search}
          />
          <UserListRating withoutCountAwards={true} users={filteredValue} />
        </div>
        <ButtonScrollUp />
      </div>
    </Meta>
  );
};

export default Rating;
