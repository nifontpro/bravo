import styles from './SingleAward.module.scss';
import { SingleAwardProps } from './SingleAward.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';
import Link from 'next/link';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/core/utils/declOfNum';

const SingleAward = ({
  award,
  className,
  ...props
}: SingleAwardProps): JSX.Element => {
  // if (award.startDate != undefined && award.endDate != undefined) {
  //   let start: Date = new Date(award.startDate * 1000);
  //   let end: Date = new Date(award.endDate * 1000);

  //   console.log((end - start)/60000 + ' минут')
  // }

  let currentDate = +new Date();

  // console.log(award);
  if (award.state == 'AWARD' || award.state == 'NONE') {
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
        <CountUsersPreview
          appearanceBtn='black'
          usersAwards={award.relateUsers}
          className={styles.default}
        />
      </div>
    );
  } else if (award.endDate != undefined) {
    return (
      <div {...props} className={cn(styles.wrapper, className)}>
        <div className={styles.imgNominee}>
          <ImageDefault
            src={award.imageUrl}
            width={165}
            height={165}
            alt={award.name}
            objectFit='cover'
            className='rounded-full'
          />
        </div>
        <div className={styles.nominee}>Номинация</div>
        <P size='m' className={styles.name}>
          {award.name}
        </P>
        <P size='s' color='gray' fontstyle='thin'>
          Осталось
          <ButtonIcon className='ml-[10px]' appearance='gray'>
            {Math.floor(
              (award.endDate - currentDate) / 1000 / 60 / 60 / 24
            )}{' '}
            {declOfNum(
              Math.floor(
                (award.endDate - currentDate) / 1000 / 60 / 60 / 24
              ),
              ['день', 'дня', 'дней']
            )}
          </ButtonIcon>
        </P>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SingleAward;
