import styles from './StatisticActivity.module.scss';
import { StatisticActivityProps } from './StatisticActivity.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import VerticalBarChart from '@/core/presenter/ui/VerticalBarChart/VerticalBarChart';
import { useStatisticActivity } from './useStatisticActivity';
import Link from 'next/link';

const StatisticActivity = ({
  yearActivity,
  className,
  ...props
}: StatisticActivityProps): JSX.Element => {
  const { objNominees, objAwards } = useStatisticActivity(yearActivity);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Link href='/activity'>
        <a className={styles.link}>
          <P size='l'>Активность</P>
        </a>
      </Link>
      <div>
        <VerticalBarChart objNominees={objNominees} objAwards={objAwards} />
      </div>
    </div>
  );
};

export default StatisticActivity;
