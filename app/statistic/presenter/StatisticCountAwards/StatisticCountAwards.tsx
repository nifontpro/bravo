import styles from './StatisticCountAwards.module.scss';
import { StatisticCountAwardsProps } from './StatisticCountAwards.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import { useRouter } from 'next/router';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import CupIcon from '@/core/presenter/images/cup.svg';

const StatisticCountAwards = ({
  awardsLight,
  className,
  ...props
}: StatisticCountAwardsProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon className={styles.img} />
          <div>
            <P size='s' className={styles.descriptionTitle}>Медалий в компании</P>
            <P size='xl'>{awardsLight.length}</P>
          </div>
        </div>
        <ArrowIcon
          onClick={() => push('/statistic')}
          className={styles.arrow}
        />
      </div>
    </div>
  );
};

export default StatisticCountAwards;
