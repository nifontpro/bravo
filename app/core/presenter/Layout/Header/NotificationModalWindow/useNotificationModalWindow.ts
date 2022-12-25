import { MouseEventHandler } from 'react';
import { messageApi } from 'message/data/message.api';
import { toast } from 'react-toastify';
import { IMessage } from 'message/model/message.types';

export const useUserPanelModalWindow = (
  message?: IMessage[] | undefined,
  notificationId?: string
) => {
  const [readMessage] = messageApi.useMarkReadMutation();

  const handleClickRead: MouseEventHandler<HTMLLIElement> = async () => {
    let isError = false;
    if (notificationId) {
      await readMessage(notificationId)
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка чтения уведомления');
        });

      if (!isError) {
        toast.success('Уведомление прочитано');
      }
    }
  };

  const handleClickReadAll: MouseEventHandler<HTMLParagraphElement> = async () => {
    let isError = false;
    if (message) {
      message.forEach((notification) => {
        readMessage(notification.id)
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error('Ошибка чтения уведомления');
          });
      });
    }
    if (!isError) {
      toast.success('Уведомление прочитано');
    }
  };

  return {
    handleClickRead,
    handleClickReadAll
  };
};
