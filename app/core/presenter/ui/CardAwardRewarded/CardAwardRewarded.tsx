import styles from './CardAwardRewarded.module.scss';
import { CardAwardRewardedProps } from './CardAwardRewarded.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const CardAwardRewarded = ({
  user,
  award,
  className,
  ...props
}: CardAwardRewardedProps): JSX.Element => {
  let convertDate = timeConverterUser(award.awardDate);
  // console.log(convertDate)

  // console.log(award);
  const [deleteUserReward] = awardApi.useDeleteUserAwardMutation();
  const handleRemove = async () => {
    let isError = false;

    await deleteUserReward({
      awardId: award.id,
      userId: user.id,
    })
      .unwrap()
      .catch(() => {
        isError = true;
        toast.error('Ошибка удаления');
      });

    if (!isError) {
      toast.success('Удаление успешно');
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <AuthComponent minRole={'director'}>
        <div onClick={handleRemove} className={styles.remove}>
          Удалить
        </div>
      </AuthComponent>

      <div className={styles.img}>
        <ImageDefault
          src={award.imageUrl}
          width={175}
          height={175}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
        />
      </div>
      <P size='l' color='white'>{award.name}</P>
      <P size='s' fontstyle='thin' color='gray96' className={styles.date}>
        Выдана {convertDate}
      </P>
    </div>
  );
};

export default CardAwardRewarded;
