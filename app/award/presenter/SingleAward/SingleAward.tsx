import styles from './SingleAward.module.scss';
import { SingleAwardProps } from './SingleAward.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';
import Link from 'next/link';

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

  // console.log(award);

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

        {/* {award.relateUsers.length == 0 && (
          <div>
            <div>{timeConverter(award.startDate)}</div>
            <div>{timeConverter(award.endDate)}</div>
          </div>
        )} */}

        <CountUsersPreview
          appearanceBtn='black'
          usersAwards={award.relateUsers}
          className={styles.default}
        />
    </div>
  );
};

export default SingleAward;
