import styles from './SingleAward.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { awardApi } from 'award/data/award.api';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonRadio from '@/core/presenter/ui/ButtonRadio/ButtonRadio';
import { SingleAwardProps } from './SingleAward.props';
import { useState } from 'react';
import cn from 'classnames';
import Button from '@/core/presenter/ui/Button/Button';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';

const SingleAward = ({
  award,
  className,
  ...props
}: SingleAwardProps): JSX.Element => {

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.img}>
        <ImageDefault
          src={award.imageUrl}
          width={165}
          height={165}
          alt={award.name}
          objectFit='cover'
          className='rounded-full'
        />
      </div>
      <P size='m' className={styles.name}>
        {award.name}
      </P>
      <div>{timeConverter(award.startDate)}</div>
      <div>{timeConverter(award.endDate)}</div>
      <div>Список юзеров</div>
    </div>
  );
};

export default SingleAward;
