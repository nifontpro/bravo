import styles from './MainNominee.module.scss';

import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import DefaultNominee from '@/core/presenter/images/starUnion-default.png';
import { useRouter } from 'next/router';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/core/utils/declOfNum';
import { IAward } from '@/award/model/award.types';

const MainNominee = ({
  awards,
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const { push } = useRouter();
  let currentDate = +new Date();

  let allNominee = awards.filter((item) => item.state === 'NOMINEE');
  let minEndDateNominee = allNominee[0];
  allNominee.forEach((item) => {
    if (item.endDate != undefined && minEndDateNominee.endDate != undefined) {
      if (item?.endDate < minEndDateNominee?.endDate) {
        minEndDateNominee = item;
      }
    }
  });

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Номинации</Htag>
        <div className={styles.bestNominee} onClick={() => push('/award')}>
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <ImageDefault
            src={minEndDateNominee?.imageUrl}
            width={236}
            height={236}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
            priority={true}
          />
        </div>
        <div className={styles.wrapper2}>
          <P size='m' color='white' className={styles.countAwardsTitle}>
            {minEndDateNominee?.name}
          </P>
          <div className={styles.imgCenter}>
            <ImageDefault
              src={minEndDateNominee?.imageUrl}
              width={236}
              height={236}
              alt='preview image'
              objectFit='cover'
              className='rounded-[10px]'
              priority={true}
            />
          </div>
          <div className={styles.countEnd}>
            <P size='s' color='white' fontstyle='thin'>
              Заканчивается
            </P>
            {minEndDateNominee != undefined &&
              minEndDateNominee.endDate != undefined &&
              (Math.floor(
                (minEndDateNominee.endDate - currentDate) / 86400000
              ) != 0 ? (
                <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                  через{' '}
                  {Math.floor(
                    (minEndDateNominee.endDate - currentDate) / 86400000
                  )}{' '}
                  {declOfNum(
                    Math.floor(
                      (minEndDateNominee.endDate - currentDate) / 86400000
                    ),
                    ['день', 'дня', 'дней']
                  )}
                </ButtonIcon>
              ) : (
                <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                  сегодня
                </ButtonIcon>
              ))}
          </div>
        </div>
        <div className={styles.imgEnd}>
          <ImageDefault
            src={minEndDateNominee?.imageUrl}
            width={236}
            height={236}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MainNominee;
