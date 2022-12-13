import styles from './StatisticAcrivity.module.scss';

import { StatisticAcrivityProps } from './StatisticAcrivity.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';


const StatisticAcrivity = ({
  className,
  ...props
}: StatisticAcrivityProps): JSX.Element => {

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l' className={styles.title}>
        Активность
      </P>
    </div>
  );
};

export default StatisticAcrivity;
