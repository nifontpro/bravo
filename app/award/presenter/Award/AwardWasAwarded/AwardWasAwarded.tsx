import styles from './AwardWasAwarded.module.scss';
import { AwardWasAwardedProps } from './AwardWasAwarded.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import CardUserAwarded from '@/core/presenter/ui/CardUserAwarded/CardUserAwarded';
import P from '@/core/presenter/ui/P/P';

const AwardWasAwarded = ({
  award,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Награжденные</Htag>
          <ButtonCircleIcon
            onClick={() => console.log('Наградить еще')}
            appearance='black'
            icon='plus'
            className='font-bold'
          >
            Наградить еще
          </ButtonCircleIcon>
        </div>
        {award.relateUsers.findIndex((item) => item.state === 'AWARD') >= 0 ? (
          <div className={styles.usersAwarded}>
            {award.relateUsers.map((item) => {
              if (item.state === 'AWARD') {
                return <CardUserAwarded user={item} />;
              }
            })}
          </div>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>
            Нет награжденных
          </P>
        )}
      </div>
    </div>
  );
};

export default AwardWasAwarded;
