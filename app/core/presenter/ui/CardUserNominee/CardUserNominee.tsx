import styles from './CardUserNominee.module.scss';
import { CardUserNomineeProps } from './CardUserNominee.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';

const CardUserNominee = ({
  user,
  className,
  ...props
}: CardUserNomineeProps): JSX.Element => {

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={user.user.imageUrl}
          width={60}
          height={60}
          alt='award img'
          objectFit='cover'
          className='rounded-full'
          // priority={true}
        />
      </div>
      <div className={styles.description}>
        <P size='s'>
          {user.user.lastname} {user.user.name}
        </P>
        <P size='xs' fontstyle='thin' color='gray' className={styles.post}>
          {user.user.post}
        </P>
      </div>
    </div>
  );
};

export default CardUserNominee;
