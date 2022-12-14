import styles from './MainNominee.module.scss';

import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import { useRouter } from 'next/router';

const MainNominee = ({
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const { push } = useRouter()
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Номинации</Htag>
        <div className={styles.bestDepart} onClick={() => push('/award')}>
          <P size='s' fontstyle='thin' color='gray'>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      <div className={styles.content}>

      </div>
    </div>
  );
};

export default MainNominee;
