import styles from './SingleUserNominee.module.scss';
import { SingleUserNomineeProps } from './SingleUserNominee.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import CardAwardRewarded from '@/core/presenter/ui/CardAwardRewarded/CardAwardRewarded';
import uniqid from 'uniqid';
import CardNominee from 'award/presenter/Award/AwardNominee/CardNominee/CardNominee';
import CardNomineeUser from './CardNomineeUser/CardNomineeUser';

const SingleUserNominee = ({
  user,
  className,
  ...props
}: SingleUserNomineeProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Номинации</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {user.awards.filter(item => item.awardState == 'NOMINEE').length}
        </P>
      </div>
      <div className={styles.content}>
        {user.awards.map((award) => {
          if (award.awardState == 'NOMINEE') {
            return (
              <CardNomineeUser key={uniqid()} userId={user.id} award={award} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SingleUserNominee;
