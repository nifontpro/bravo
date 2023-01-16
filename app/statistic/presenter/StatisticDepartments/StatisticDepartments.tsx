import styles from './StatisticDepartments.module.scss';
import uniqid from 'uniqid';
import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import AwardIcon from '@/core/presenter/images/award.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';

const StatisticDepartments = ({
  usersCountAwardsOnDepCompany,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
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
                <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
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
                <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default StatisticDepartments;
