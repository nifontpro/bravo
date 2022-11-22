import styles from './UserPreview.module.scss';
import cn from 'classnames';
import { UserPreviewProps } from './UserPreview.props';
import { ImageDefault } from '../icons/ImageDefault';
import P from '../P/P';

const UserPreview = ({
  user,
  children,
  className,
  ...props
}: UserPreviewProps): JSX.Element => {
  return (
    <div className={styles.container} {...props}>
      <div className={cn(className, styles.wrapper)} {...props}>
        <ImageDefault
          src={user.imageUrl}
          width={76}
          height={76}
          alt={user.name}
          objectFit='cover'
          className='rounded-full'
        />
        <div className={styles.info}>
          <P size='m' fontstyle='bold'>
            {user.lastname} {user.name}
          </P>
          <P color='gray' size='m' fontstyle='thin'>
            Должность работника
          </P>
        </div>
      </div>
      <div>
        <P color='gray' size='m' fontstyle='thin'>
          Edit
        </P>
        <P color='gray' size='m' fontstyle='thin'>
          Remove
        </P>
      </div>
    </div>
  );
};
export default UserPreview;
