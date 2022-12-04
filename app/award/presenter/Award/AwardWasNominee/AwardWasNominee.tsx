import styles from './AwardWasNominee.module.scss';
import { AwardWasNomineeProps } from './AwardWasNominee.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import CardUserNominee from '@/core/presenter/ui/CardUserNominee/CardUserNominee';
import P from '@/core/presenter/ui/P/P';

const AwardWasNominee = ({
  award,
  className,
  ...props
}: AwardWasNomineeProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Были номинированы</Htag>
        </div>
        {award.relateUsers.findIndex((item) => item.state === 'NOMINEE') > 0 ? (
          <div className={styles.usersAwarded}>
            {award.relateUsers.map((item) => {
              if (item.state === 'NOMINEE') {
                return <CardUserNominee user={item} />;
              }
            })}
          </div>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>Нет номинантов</P>
        )}
      </div>
    </div>
  );
};

export default AwardWasNominee;
