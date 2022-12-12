import styles from './CardNomineeUser.module.scss';
import { CardNomineeUserProps } from './CardNomineeUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { timeConverterUser } from '@/core/utils/timeConverterUser';
import Button from '../../../../../core/presenter/ui/Button/Button';
import RemoveIcon from './removeUser.svg';
import { awardApi } from 'award/data/award.api';
import { toast } from 'react-toastify';
import { useCardNominee } from 'award/presenter/Award/AwardNominee/CardNominee/useCardNominee';

const CardNomineeUser = ({
  userId,
  award,
  className,
  ...props
}: CardNomineeUserProps): JSX.Element => {
  let awardId = award.id

  let convertDate = timeConverterUser(award?.awardDate);
  const { handleReward, handleRemove } = useCardNominee(userId, awardId);
  console.log(award);

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
          <RemoveIcon
            onClick={handleRemove}
            className='ml-[5px] cursor-pointer'
          />
        </div>
      )}
    </div>
  );
};

export default CardNomineeUser;
