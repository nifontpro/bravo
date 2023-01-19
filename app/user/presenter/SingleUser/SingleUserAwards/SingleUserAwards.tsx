import styles from './SingleUserAwards.module.scss';
import { SingleUserAwardsProps } from './SingleUserAwards.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import CardAwardRewarded from '@/core/presenter/ui/CardAwardRewarded/CardAwardRewarded';

import uniqid from 'uniqid';

const SingleUserAwards = ({
  user,
  className,
  ...props
}: SingleUserAwardsProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Медали</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {user.awards.filter((item) => item.awardState == 'AWARD').length}
        </P>
      </div>
      {user.awards.filter((award) => award.awardState == 'AWARD').length > 0 ? (
        <div className={styles.content}>
          {user.awards.map((award) => {
            if (award.awardState == 'AWARD') {
              return (
                <CardAwardRewarded key={uniqid()} award={award} user={user} />
              );
            }
          })}
        </div>
      ) : (
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          У вас пока нет медалей
        </P>
      )}
    </div>
  );
};

export default SingleUserAwards;
