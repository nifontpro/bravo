import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useRouter } from 'next/router';
import { awardApi } from 'award/data/award.api';
import { IAwardRelateUser } from 'award/model/awardRelate.types';

export const useCardNominee = (user: IAwardRelateUser, awardId: string) => {
  const [reward] = awardApi.useAwardUserMutation();
  const [deleteUserReward] = awardApi.useDeleteUserAwardMutation();

  const { push } = useRouter();

  const handleRemove = async () => {
    let isError = false;
    if (user) {
      await deleteUserReward({
        awardId: awardId,
        userId: user.user.id,
      })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка удаления');
        });

      if (!isError) {
        toast.success('Удаление успешно');
      }
    }
  };

  return useMemo(() => {
    const handleReward = async () => {
      let isError = false;
      if (user) {
        await reward({
          awardId: awardId,
          userId: user.user.id,
          awardState: 'AWARD',
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error('Ошибка награждения');
          });

        if (!isError) {
          toast.success('Награждение успешно');
        }
      }
    };

    return {
      handleReward,
      handleRemove
    };
  }, [user, push, reward]);
};
