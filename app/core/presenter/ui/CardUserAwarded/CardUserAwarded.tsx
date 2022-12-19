import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const CardUserAwarded = ({
  award,
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.awardDate);
  // console.log(convertDate)

  // console.log(user);
  const [deleteUserReward] = awardApi.useDeleteUserAwardMutation();
  const handleRemove = async () => {
    let isError = false;
    if (user) {
      await deleteUserReward({
        awardId: award.id,
        userId: user.user.id,
      })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка удаления');
        });

      if (!isError) {
        toast.success('Удаление успешно');
      }
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={user.user.imageUrl}
          width={175}
          height={175}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
        />
      </div>
      <P size='l'>
        {user.user.lastname} {user.user.name}
      </P>
      <P size='s' fontstyle='thin' color='gray' className={styles.post}>
        {user.user.post}
      </P>
      <P size='s' fontstyle='thin' color='gray' className={styles.date}>
        {convertDate}
      </P>
      <AuthComponent minRole={'director'}>
        <div onClick={handleRemove} className={styles.remove}>
          Удалить
        </div>
      </AuthComponent>
    </div>
  );
};

export default CardUserAwarded;
