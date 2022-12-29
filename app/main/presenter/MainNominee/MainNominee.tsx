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

const MainNominee = ({
  awards,
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const { push } = useRouter();
  let currentDate = +new Date();
  let nominee = awards.find((award) => award.state == 'NOMINEE');
  // console.log(nominee);

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
            src={nominee?.imageUrl}
            width={236}
            height={236}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </div>
        <P size='m' color='white' className={styles.countAwardsTitle}>
          {nominee?.name}
        </P>
        <div className={styles.countEnd}>
          <P size='s' color='white' fontstyle='thin'>
            Заканчивается
          </P>
          {nominee != undefined && nominee.endDate != undefined && (
            <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
              через{' '}
              {Math.floor(
                (nominee.endDate - currentDate) / 1000 / 60 / 60 / 24
              )}{' '}
              {declOfNum(
                Math.floor(
                  (nominee.endDate - currentDate) / 1000 / 60 / 60 / 24
                ),
                ['день', 'дня', 'дней']
              )}
            </ButtonIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNominee;
