import styles from './MainActivity.module.scss';

import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import { useRouter } from 'next/router';

const MainActivity = ({
  className,
  ...props
}: MainActivityProps): JSX.Element => {
  const { push } = useRouter();
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Активность</Htag>
        <div className={styles.bestDepart} onClick={() => push('/message')}>
          <P size='s' fontstyle='thin' color='gray'>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default MainActivity;
