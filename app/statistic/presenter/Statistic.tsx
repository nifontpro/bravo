import styles from './Statistic.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { StatisticProps } from './Statistic.props';
import cn from 'classnames';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SelectCustom from '@/core/presenter/ui/SelectCustom/SelectCustom';
import { useState } from 'react';
import { useRouter } from 'next/router';
import StatisticUsersGender from './StatisticUsersGender/StatisticUsersGender';
import StatisticCountNominee from './StatisticCountNominee/StatisticCountNominee';
import StatisticCountAwards from './StatisticCountAwards/StatisticCountAwards';
import StatisticUsersAwards from './StatisticUsersAwards/StatisticUsersAwards';

const Statistic = ({
  company,
  className,
  ...props
}: StatisticProps): JSX.Element => {
  const { push } = useRouter();
  const { awardsLight } = useAward('');
  const { users } = useMyUser('');

  const [departSort, setDepartSort] = useState<string>('');

  // console.log(users);

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

          <div className={styles.countDepartment}></div>

          <StatisticUsersGender users={users} className={styles.usersGender} />

          <StatisticUsersAwards users={users} className={styles.usersAwards} />

          <div className={styles.activity}></div>
        </div>
      </div>
    </Meta>
  );
};

export default Statistic;
