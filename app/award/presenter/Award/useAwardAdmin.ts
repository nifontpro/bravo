import { useMemo} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useRouter } from 'next/router';
import { awardApi } from 'award/data/award.api';

export const useAwardAdmin = (awardId: string) => {
  const [deleteAward] = awardApi.useDeleteMutation();

  const { push } = useRouter();

  return useMemo(() => {
    const deleteAsync = async (id: string) => {
      await deleteAward(awardId)
        .unwrap()
        .then(() => {
          toast.success('Отдел успешно удален');
          push('/award')
        })
        .catch((e) => {
          toastError(e, 'Ошибка при удалении отдела');
        });
    };

    return {
      deleteAsync,
    };
  }, [awardId, push, deleteAward]);
};
