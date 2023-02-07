import styles from './UserPreview.module.scss';
import cn from 'classnames';
import { UserPreviewProps } from './UserPreview.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '../P/P';

const UserPreview = ({
  user,
  forWhat,
  children,
  className,
  ...props
}: UserPreviewProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <ImageDefault
        src={user.imageUrl}
        width={76}
        height={76}
        alt={user.name}
        objectFit='cover'
        className='rounded-xl'
        // priority={true}
      />
      <div className={styles.info}>
        <P size='m' fontstyle='bold'>
          {user.lastname} {user.name}
        </P>
        <P color='gray' size='m' fontstyle='thin'>
          {user.post}
        </P>
      </div>
      {forWhat == 'user' && (
        <P size='xs' fontstyle='thin' className={styles.departName}>
          {user.departmentName}
        </P>
      )}
    </div>
  );
};
export default UserPreview;
