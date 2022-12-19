import styles from './StatisticDepartments.module.scss';
import uniqid from 'uniqid';
import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import { useDepartment } from '@/department/presenter/useDepartment';
import P from '@/core/presenter/ui/P/P';
import AwardIcon from './award.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';

const StatisticDepartments = ({
  usersCountAwardsOnDepCompany,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {
  // const { departmentInCompany } = useDepartment('');
  // console.log(usersCountAwardsOnDepCompany);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='s' className={styles.title}>
        По отделам
      </P>
      {usersCountAwardsOnDepCompany.map((depart, index) => {
        if (index == 0) {
          return (
            <div
              key={uniqid()}
              className={cn(styles.bestDepart, styles.depart)}
            >
              <div>
                <P size='l'>{depart.id.name}</P>
                <P size='xs' className={styles.best}>
                  Лучший отдел
                </P>
              </div>
              <div className={styles.countAwards}>
                <Htag className={styles.count} tag='h2'>
                  {depart.userAwardCount}
                </Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            </div>
          );
        } else {
          return (
            <div key={uniqid()} className={styles.depart}>
              <P size='l'>{depart.id.name}</P>
              <div className={styles.countAwards}>
                <Htag className={styles.count} tag='h2'>
                {depart.userAwardCount}
                </Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default StatisticDepartments;
