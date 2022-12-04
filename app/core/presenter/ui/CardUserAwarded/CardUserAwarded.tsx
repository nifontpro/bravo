import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { timeConverterUser } from '@/core/utils/timeConverterUser';

const CardUserAwarded = ({
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.awardDate) 
  // console.log(convertDate)

  // console.log(user);

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
      <P size='l'>{user.user.lastname} {user.user.name}</P>
      <P size='s' fontstyle='thin' color='gray' className={styles.post}>{user.user.post}</P>
      <P size='s' fontstyle='thin' color='gray' className={styles.post}>{convertDate}</P>
    </div>
  );
};

export default CardUserAwarded;
