import styles from './StatisticCountNominee.module.scss';

import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';

import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { useRouter } from 'next/router';

const StatisticCountNominee = ({
  awardsLight,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  const { push } = useRouter()
  // console.log(awardsLight)

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.countNominee_head} onClick={() => push('/rating')}>
        <P size='l'>Номинаций в компании</P>
        <ButtonCircleIcon appearance='transparent' icon='right' />
      </div>
      <Htag tag='h1'>
        {awardsLight.filter((award) => award.state == 'NOMINEE').length}
      </Htag>
    </div>
  );
};

export default StatisticCountNominee;
