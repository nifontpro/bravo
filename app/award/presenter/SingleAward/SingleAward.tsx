import styles from './SingleAward.module.scss';
import { SingleAwardProps } from './SingleAward.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';

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
