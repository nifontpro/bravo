import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import AwardIcon from '@/core/presenter/images/union.svg';
import EditPanel from '../EditPanel/EditPanel';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import { getUserEditUrl } from '@/core/config/api.config';
import { useState } from 'react';

const CardUserAwarded = ({
  award,
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.awardDate);
  const [visible, setVisible] = useState<boolean>(false);

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
      <div className={styles.date}>
        <P size='s' fontstyle='thin' className={styles.dateRewarded}>
          {convertDate}
        </P>
        <AwardIcon />
      </div>

      <AuthComponent minRole={'director'}>
        <ButtonCircleIcon
          onClick={() => setVisible(!visible)}
          icon='dots'
          appearance='transparent'
          className={styles.dots}
        />
        <EditPanel
          getUrl={getUserEditUrl}
          onMouseLeave={() => setVisible(!visible)}
          id={user.user.id}
          deleteAsync={handleRemove}
          visible={visible}
        />
      </AuthComponent>
    </div>
  );
};

export default CardUserAwarded;
