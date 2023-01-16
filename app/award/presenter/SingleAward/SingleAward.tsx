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
  let currentDate = +new Date();

  if (award.state == 'AWARD' || award.state == 'NONE') {
    return (
      <div
        {...props}
        className={cn(styles.wrapper, styles.wrapperAward, className)}
      >
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
        <P size='m' color='white' className={styles.name}>
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
      <div
        {...props}
        className={cn(styles.wrapper, styles.wrapperNominee, className)}
      >
        <div className={styles.nominee}>Номинация</div>
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

        <P size='m' color='white' className={styles.name}>
          {award.name}
        </P>
        <P size='xs' color='gray96' fontstyle='thin' className={styles.date}>
          Награждение через
          <ButtonIcon className={styles.btnIcon} appearance='whiteBlack'>
            {Math.floor((award.endDate - currentDate) / 1000 / 60 / 60 / 24)}{' '}
            {declOfNum(
              Math.floor((award.endDate - currentDate) / 1000 / 60 / 60 / 24),
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
