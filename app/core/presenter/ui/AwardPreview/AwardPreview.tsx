import styles from './AwardPreview.module.scss';
import cn from 'classnames';
import { AwardPreviewProps } from './AwardPreview.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '../P/P';

const AwardPreview = ({
  award,
  children,
  className,
  ...props
}: AwardPreviewProps): JSX.Element => {
  return (
      <div className={cn(className, styles.wrapper)} {...props}>
        <ImageDefault
          src={award.imageUrl}
          width={76}
          height={76}
          alt={award.name}
          objectFit='cover'
          className='rounded-full'
          // priority={true}
        />
        <div className={styles.info}>
          <P size='m' fontstyle='bold'>
            {award.name}
          </P>
          {/* <P color='gray' size='m' fontstyle='thin'>
            {user.post}
          </P> */}
        </div>
      </div>
  );
};
export default AwardPreview;
