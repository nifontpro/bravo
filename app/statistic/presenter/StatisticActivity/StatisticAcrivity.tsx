import styles from './StatisticAcrivity.module.scss';
import { StatisticActivityProps } from './StatisticActivity.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import VerticalBarChart from '@/core/presenter/ui/VerticalBarChart/VerticalBarChart';
import { useStatisticActivity } from './useStatisticActivity';

const StatisticActivity = ({
  className,
  ...props
}: StatisticActivityProps): JSX.Element => {
  const { objNominees, objAwards } = useStatisticActivity()

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
      <VerticalBarChart objNominees={objNominees} objAwards={objAwards}/>
    </div>
  );
};

export default StatisticActivity;
