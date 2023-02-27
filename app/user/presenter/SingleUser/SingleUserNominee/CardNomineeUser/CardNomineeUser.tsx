import styles from './CardNomineeUser.module.scss';
import { CardNomineeUserProps } from './CardNomineeUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import Button from '../../../../../core/presenter/ui/Button/Button';
import { useCardNominee } from 'award/presenter/Award/AwardNominee/CardNominee/useCardNominee';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

const CardNomineeUser = ({
  userId,
  award,
  className,
  ...props
}: CardNomineeUserProps): JSX.Element => {
  let awardId = award.id;

  let convertDate = timeConverterUser(award?.awardDate);
  const { handleReward, handleRemove } = useCardNominee(userId, awardId);
  // console.log(award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={award?.imageUrl}
          width={76}
          height={76}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          // priority={true}
        />
      </div>

      <div className={styles.user}>
        <P size='l'>{award?.name}</P>
      </div>

      {award.awardDate != undefined ? (
        <P size='s' fontstyle='thin' color='gray' className={styles.date}>
          Завершена {convertDate}
        </P>
      ) : (
        <AuthComponent minRole={'director'}>
          <div className={styles.buttons}>
            {award.userState === 'NOMINEE' && (
              <Button onClick={handleReward} size='m' appearance='blackWhite'>
                Наградить
              </Button>
            )}
            {award.userState === 'AWARD' && (
              <Button
                size='m'
                appearance='blackWhite'
                className={styles.btnDefault}
              >
                Буден награжден
              </Button>
            )}
            <ButtonEdit icon='remove' onClick={handleRemove} />
          </div>
        </AuthComponent>
      )}
    </div>
  );
};

export default CardNomineeUser;
