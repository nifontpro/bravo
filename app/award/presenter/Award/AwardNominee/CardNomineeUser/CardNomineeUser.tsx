import styles from './CardNomineeUser.module.scss';
import { CardNomineeUserProps } from './CardNomineeUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import AwardIcon from '@/core/presenter/images/union.svg';
import Htag from '@/core/presenter/ui/Htag/Htag';

const CardNomineeUser = ({
  user,
  className,
  ...props
}: CardNomineeUserProps): JSX.Element => {
  // console.log(user)

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={user.imageUrl}
          width={76}
          height={76}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          // priority={true}
        />
      </div>

      <div className={styles.user}>
        <P size='l'>
          {user.lastname} {user.name}
        </P>
        <P size='s' fontstyle='thin' color='gray' className={styles.post}>
          {user.post}
        </P>
      </div>

      <div className={styles.countAwards}>
        <Htag tag='h2'>
          {user?.awards.filter((item) => item.state == 'AWARD').length}
        </Htag>
        <AwardIcon className={styles.union} />
      </div>
    </div>
  );
};

export default CardNomineeUser;
