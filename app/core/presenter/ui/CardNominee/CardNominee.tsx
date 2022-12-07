import styles from './CardNominee.module.scss';
import { CardNomineeProps } from './CardNominee.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import Button from '../Button/Button';
import RemoveIcon from './removeUser.svg';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';

const CardNominee = ({
  awardId,
  user,
  className,
  ...props
}: CardNomineeProps): JSX.Element => {
  let convertDate = timeConverterUser(user.nomineeDate);
  // console.log(convertDate)

  // console.log(user);

  const [reward] = awardApi.useAwardUserMutation();

  const handleClick = async () => {

    let isError = false;
    if (user) {
      await reward({ awardId: awardId, userId: user.user.id, awardState: 'AWARD' })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка награждения');
        });

      if (!isError) {
        toast.success('Награждение успешно');
      }
    }
  };

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
        {convertDate}
      </P>

      <div className={styles.buttons}>
        {user.state === 'NOMINEE' && (
          <Button onClick={handleClick} size='m' appearance='blackWhite'>
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
        <RemoveIcon
          onClick={() => console.log('Удалить')}
          className='ml-[5px] cursor-pointer'
        />
      </div>
    </div>
  );
};

export default CardNominee;
