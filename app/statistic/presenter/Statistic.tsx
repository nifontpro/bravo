import styles from './Statistic.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { StatisticProps } from './Statistic.props';
import Htag from '@/core/presenter/ui/Htag/Htag';
import StatisticUsersGender from './StatisticUsersGender/StatisticUsersGender';
import StatisticCountNominee from './StatisticCountNominee/StatisticCountNominee';
import StatisticCountAwards from './StatisticCountAwards/StatisticCountAwards';
import StatisticUsersAwards from './StatisticUsersAwards/StatisticUsersAwards';
import StatisticDepartments from './StatisticDepartments/StatisticDepartments';
import P from '@/core/presenter/ui/P/P';
import Select from 'react-select';
import StatisticActivity from './StatisticActivity/StatisticActivity';
import { useStatistic } from './useStatistic';

const Statistic = ({
  company,
  className,
  ...props
}: StatisticProps): JSX.Element => {
  const {
    arrYear,
    onChange,
    animatedComponents,
    awardsLight,
    push,
    usersCountAwardsOnDepCompany,
    yearActivity,
    users,
  } = useStatistic();

  return (
    <Meta title='Статистика'>
      <div {...props} className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h3' className={styles.header}>
            Статистика
          </Htag>
          <div className={styles.headerTitle}>
            <Select
              className={styles.selectCompany}
              classNamePrefix='custom-select-rating'
              placeholder={'2023'}
              options={arrYear}
              onChange={onChange}
              components={animatedComponents}
            />
            <P size='l' className={styles.title}>
              По отделам
            </P>
          </div>
        </div>

        <div className={styles.content}>
          <StatisticCountAwards
            className={styles.countAwards}
            awardsLight={awardsLight}
            onClick={() => push('/award')}
          />

          <StatisticCountNominee
            className={styles.countNominee}
            awardsLight={awardsLight}
          />

          <StatisticDepartments
            usersCountAwardsOnDepCompany={usersCountAwardsOnDepCompany}
            className={styles.countDepartment}
          />

          <StatisticUsersGender users={users} className={styles.usersGender} />

          <StatisticUsersAwards users={users} className={styles.usersAwards} />

          <StatisticActivity
            className={styles.activity}
            yearActivity={yearActivity}
          />
        </div>
      </div>
    </Meta>
  );
};

export default Statistic;
