import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { IAwardCreate } from 'award/model/api.types';
import { awardApi } from 'award/data/award.api';
import { IAward } from 'award/model/award.types';

export const useAwardCreate = (
  setValue: UseFormSetValue<IAwardCreate>,
  reset: UseFormReset<IAwardCreate>,
  companyId?: string
) => {
  const { back } = useRouter();

  useEffect(() => {
    if (companyId) {
      setValue('companyId', companyId);
    }
  }, [companyId, setValue]);

  const [create] = awardApi.useCreateMutation();
  const [updateImage] = awardApi.useUpdateImageMutation();

  const onSubmit: SubmitHandler<IAwardCreate> = async (data) => {
    if (data.endDate != undefined && data.startDate != undefined) {
      if (data.endDate == 0) {
        data.endDate = 0;
      } else {
        let newDate = new Date(data.endDate).getTime() / 1000;
        data.endDate = newDate;
      }
      if (data.startDate == 0) {
        data.startDate = 0;
      } else {
        let newDate = new Date(data.startDate).getTime() / 1000;
        data.startDate = newDate;
      }
    }

    let isError = false;
    // console.log(data);

    if (companyId) {
      await create({ ...data })
        .unwrap()
        .then(async (award: IAward) => {
          const fileData = data.file[0];
          if (fileData) {
            const formData = new FormData();
            formData.append('imageUrl', fileData);
            await updateImage({ awardId: award.id, formData })
              .unwrap()
              .catch(() => {
                isError = true;
                toast.error('Ошибка добавления фото награды');
              });
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания награды');
        });
    } else {
      isError = true;
      toast.error('Необходимо выбрать компанию');
    }
    if (!isError) {
      toast.success('Награда успешно создана');
      back();
    }
    reset();
  };

  return { onSubmit };
};
