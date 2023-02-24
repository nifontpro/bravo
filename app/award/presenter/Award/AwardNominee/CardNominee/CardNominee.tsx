import styles from './CardNominee.module.scss';
import { CardNomineeProps } from './CardNominee.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
// import { timeConverterUser } from '@/core/utils/timeConverterUser';
import Button from '../../../../../core/presenter/ui/Button/Button';
import { useCardNominee } from './useCardNominee';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

const CardNominee = ({
  awardId,
  user,
  className,
  ...props
}: CardNomineeProps): JSX.Element => {
  // let convertDate = timeConverterUser(user.nomineeDate);
  let userId = user.user.id;
  const { handleReward, handleRemove } = useCardNominee(userId, awardId);
  // console.log(user)

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={user.user.imageUrl}
          width={76}
          height={76}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          priority={true}
        />
      </div>

      <div className={styles.user}>
        <P size='l'>
          {user.user.lastname} {user.user.name}
        </P>
        <P size='s' fontstyle='thin' color='gray' className={styles.post}>
          {user.user.post}
        </P>
      </div>

      <P size='s' fontstyle='thin' color='gray' className={styles.date}>
        {/* {convertDate} */}
        {user.user.departmentId}
      </P>

      <div className={styles.buttons}>
        {user.state === 'NOMINEE' && (
          <Button onClick={handleReward} size='m' appearance='blackWhite'>
            Наградить
          </Button>
        )}
        {user.state === 'AWARD' && (
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
    </div>
  );
};

export default CardNominee;
