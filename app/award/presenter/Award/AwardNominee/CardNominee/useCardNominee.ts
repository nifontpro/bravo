import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useRouter } from 'next/router';
import { awardApi } from 'award/data/award.api';
import { IAwardRelateUser } from 'award/model/awardRelate.types';

export const useCardNominee = (userId: string, awardId: string) => {
  const [reward] = awardApi.useAwardUserMutation();
  const [deleteUserReward] = awardApi.useDeleteUserAwardMutation();

  const { push } = useRouter();

  const handleRemove = async () => {
    let isError = false;
    if (userId) {
      await deleteUserReward({
        awardId: awardId,
        userId: userId,
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
      if (userId) {
        await reward({
          awardId: awardId,
          userId: userId,
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
  }, [userId, push, reward]);
};
