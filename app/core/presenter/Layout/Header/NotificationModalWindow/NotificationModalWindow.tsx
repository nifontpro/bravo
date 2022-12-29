import styles from './NotificationModalWindow.module.scss';
import { NotificationModalWindowProps } from './NotificationModalWindow.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import { ForwardedRef, forwardRef } from 'react';
import { useUserPanelModalWindow } from './useNotificationModalWindow';
import uniqid from 'uniqid';
import NotificationItem from './NotificationItem/NotificationItem';

const NotificationModalWindow = forwardRef(
  (
    {
      visibleModal,
      setVisibleModal,
      message,
      className,
      ...props
    }: NotificationModalWindowProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { handleClickReadAll } = useUserPanelModalWindow(message);

    return (
      <div
        className={cn(
          styles.userModalWindow,
          {
            [styles.hidden]: !visibleModal,
          },
          className
        )}
        {...props}
        ref={ref}
      >
        <Htag tag='h3' className={styles.title}>
          Уведомления
        </Htag>

        {message != undefined &&
        message.filter((item) => item.read == false).length > 0 ? (
          <>
            <ul className={styles.list}>
              {message.map((notification) => {
                if (notification.read == false) {
                  return (
                    <NotificationItem
                      key={uniqid()}
                      notification={notification}
                    />
                  );
                }
              })}
            </ul>
            <P size='xs' className={styles.check} onClick={handleClickReadAll}>
              Отметить все прочитанным
            </P>
          </>
        ) : (
          <P size='m' fontstyle='thin' className={styles.noneNotification}>
            У вас пока нет уведомлений
          </P>
        )}
      </div>
    );
  }
);

NotificationModalWindow.displayName = 'NotificationModalWindow';
export default NotificationModalWindow;
