import styles from './StatisticAcrivity.module.scss';

import { StatisticAcrivityProps } from './StatisticAcrivity.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import VerticalBarChart from '@/core/presenter/ui/VerticalBarChart/VerticalBarChart';
import { useActivity } from '@/activity/presenter/useActivity';

const StatisticAcrivity = ({
  className,
  ...props
}: StatisticAcrivityProps): JSX.Element => {
  const { activity } = useActivity();
  console.log(activity);
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l' className={styles.title}>
        Активность
      </P>
      {/* <ul className={styles.list}>
        <li className={styles.item}>
          <div className={cn(styles.circle, styles.yellow)}></div>
          <P size='s' color='gray96'>
            Медали
          </P>
        </li>
        <li className={styles.item}>
          <div className={cn(styles.circle, styles.black)}></div>
          <P size='s' color='gray96'>
            Номинации
          </P>
        </li>
      </ul> */}
      <VerticalBarChart />
    </div>
  );
};

export default StatisticAcrivity;
