import styles from './AwardNominee.module.scss';
import { AwardNomineeProps } from './AwardNominee.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import CardUserAwarded from '@/core/presenter/ui/CardUserAwarded/CardUserAwarded';
import P from '@/core/presenter/ui/P/P';
import uniqid from 'uniqid';
import CardNominee from 'award/presenter/Award/AwardNominee/CardNominee/CardNominee';
import { awardApi } from 'award/data/award.api';

const AwardNominee = ({
  award,
  className,
  ...props
}: AwardNomineeProps): JSX.Element => {
  // console.log(award)

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Кто участвует</Htag>
          <ButtonCircleIcon
            onClick={() => console.log('Наградить еще')}
            appearance='black'
            icon='plus'
            className='font-bold'
          >
            Добавить участников
          </ButtonCircleIcon>
        </div>

        <div className={styles.usersAwarded}>
          {award.relateUsers.map((item) => {
            if (item.state === 'NOMINEE' || item.state === 'AWARD') {
              return (
                <CardNominee awardId={award.id} user={item} key={uniqid()} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AwardNominee;
