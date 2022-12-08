import styles from './Rating.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { awardApi } from 'award/data/award.api';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import { userApi } from '@/user/data/user.api';
import Spinner from '@/core/presenter/ui/Spinner/Spinner';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';
import { departmentApi } from '@/department/data/department.api';
import { IOption } from '@/core/presenter/ui/SelectArtem/SelectArtem.interface';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import { useState } from 'react';
import ButtonToggle from '@/core/presenter/ui/ButtonToggle/ButtonToggle';
import UserListRating from './UserListRating/UserListRating';
import SelectCustom from '@/core/presenter/ui/SelectCustom/SelectCustom';

const Rating = ({ company, className, ...props }: RatingProps): JSX.Element => {
  const [state, setState] = useState<1 | -1>(1);
  const { data: users, isLoading } = userApi.useGetByCompanyWithAwardsQuery({
    companyId: company.id,
  });

  const { data: departments} = departmentApi.useGetByCompanyQuery(
    company.id
  );
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
  })

  // console.log(departments);

  return (
    <Meta title='Рейтинг'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h1'>Рейтинг</Htag>
        <div className={styles.header}>
          <SelectCustom placeholder={company.name} className={styles.selectCompany} options={[]}/>
          <SelectCustom placeholder={'Все отделы'} className={styles.selectDepartment} options={arrDeparts}/>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>
          <ButtonToggle className={styles.toogle}>Только с наградами</ButtonToggle>
        </div>
        <UserListRating users={users} />
      </div>
    </Meta>
  );
};

export default Rating;
