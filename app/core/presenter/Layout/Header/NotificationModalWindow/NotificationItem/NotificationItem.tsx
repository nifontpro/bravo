import styles from './NotificationItem.module.scss';
import { NotificationItemProps } from './NotificationItem.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import { useUserPanelModalWindow } from '../useNotificationModalWindow';

const NotificationItem = ({
  className,
  notification,
  ...props
}: NotificationItemProps): JSX.Element => {

  const {
    handleClickRead,
  } = useUserPanelModalWindow(undefined, notification.id);

  return (
    <li {...props} className={cn(styles.item, className)} onClick={handleClickRead}>
      <div className={styles.img}>
        <ImageDefault
          src={notification.imageUrl}
          width={64}
          height={64}
          alt='award img'
          objectFit='cover'
          className='rounded-[5px]'
        />
      </div>
      <div>
        <P size='xs' className={styles.link}>
          {notification.text}
        </P>
        <P size='xs' fontstyle='thin' color='gray' className={styles.link}>
          {timeConverter(notification.sendDate)}
        </P>
      </div>
    </li>
  );
};

export default NotificationItem;
