import styles from './Statistic.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { StatisticProps } from './Statistic.props';
import cn from 'classnames';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SelectCustom from '@/core/presenter/ui/SelectCustom/SelectCustom';
import { useState } from 'react';
import StatisticUsersGender from './StatisticUsersGender/StatisticUsersGender';
import StatisticCountNominee from './StatisticCountNominee/StatisticCountNominee';
import StatisticCountAwards from './StatisticCountAwards/StatisticCountAwards';
import StatisticUsersAwards from './StatisticUsersAwards/StatisticUsersAwards';
import StatisticDepartments from './StatisticDepartments/StatisticDepartments';
import StatisticAcrivity from './StatisticAcrivity/StatisticAcrivity';

const Statistic = ({
  company,
  className,
  ...props
}: StatisticProps): JSX.Element => {
  const { awardsLight, awardsFullCompany } = useAward('');
  const { usersCountAwardsOnDepCompany } = useMyUser('');
  const { usersWithAwardsUnion: users } = useMyUser('');

  // console.log(usersCountAwardsOnDepCompany)

  const [departSort, setDepartSort] = useState<string>('');

  return (
    <Meta title='Статистика'>
      <div {...props} className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h3' className={styles.header}>
            Статистика
          </Htag>
          <SelectCustom
            placeholder={'2022'}
            className={styles.selectCompany}
            options={[]}
            setDepartSort={setDepartSort}
          />
        </div>

        <div className={styles.content}>
          <StatisticCountAwards
            className={styles.countAwards}
            awardsLight={awardsLight}
          />

          <StatisticCountNominee
            className={styles.countNominee}
            awardsLight={awardsLight}
          />

          <StatisticDepartments usersCountAwardsOnDepCompany={usersCountAwardsOnDepCompany} className={styles.countDepartment}/>

          <StatisticUsersGender users={users} className={styles.usersGender} />

          <StatisticUsersAwards users={users} className={styles.usersAwards} />

          <StatisticAcrivity className={styles.activity} />
        </div>
      </div>
    </Meta>
  );
};

export default Statistic;
