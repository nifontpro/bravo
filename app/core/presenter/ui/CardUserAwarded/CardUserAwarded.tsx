import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';
import AwardIcon from '@/core/presenter/images/union.svg';
import { getUserEditUrl } from '@/core/config/api.config';
import { useRef, useState } from 'react';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import EditPanelAuthBtn from '../EditPanelAuthBtn/EditPanelAuthBtn';

const CardUserAwarded = ({
  award,
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.awardDate);

  const [visible, setVisible] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

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
      <div className={styles.contentTitle}>
        <div className={styles.img}>
          <ImageDefault
            src={user.user.imageUrl}
            width={175}
            height={175}
            alt='award img'
            objectFit='cover'
            className='rounded-[27px]'
            // priority={true}
          />
        </div>
        <P size='l'>
          {user.user.lastname} {user.user.name}
        </P>
        <P size='s' fontstyle='thin' color='gray' className={styles.post}>
          {user.user.post}
        </P>
      </div>

      <div className={styles.date}>
        <P size='xs' fontstyle='thin' className={styles.dateRewarded}>
          {convertDate}
          <AwardIcon className={styles.icon}/>
        </P>
      </div>

      <EditPanelAuthBtn
        onlyRemove={true}
        handleRemove={handleRemove}
        id={user.user.id}
        getUrl={getUserEditUrl}
      />
    </div>
  );
};

export default CardUserAwarded;
