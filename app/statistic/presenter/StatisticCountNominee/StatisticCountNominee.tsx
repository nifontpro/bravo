import styles from './StatisticCountNominee.module.scss';
import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import { useRouter } from 'next/router';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import CupIcon from '@/core/presenter/images/cup.svg';

const StatisticCountNominee = ({
  awardsLight,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon className={styles.img} />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Номинации
            </P>
            <P size='xl'>
              {awardsLight.filter((award) => award.state == 'NOMINEE').length}
            </P>
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

export default StatisticCountNominee;
