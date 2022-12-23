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
  companyId?: string,
  arrChoiceUser?: string[]
) => {
  const { back, push } = useRouter();

  useEffect(() => {
    if (companyId) {
      setValue('companyId', companyId);
    }
  }, [companyId, setValue]);

  const [create] = awardApi.useCreateMutation();
  const [updateImage] = awardApi.useUpdateImageMutation();
  const [reward] = awardApi.useAwardUserMutation();

  const onSubmitReward: SubmitHandler<IAwardCreate> = async (data) => {
    // if (data.endDate != undefined && data.startDate != undefined) {
    //   if (data.endDate == 0) {
    //     data.endDate = Math.floor(new Date().getTime() / 1000);
    //   } else {
    //     let newDate = new Date(data.endDate).getTime() / 1000;
    //     data.endDate = newDate;
    //   }
    //   if (data.startDate == 0) {
    //     data.startDate = 0;
    //   } else {
    //     let newDate = new Date(data.startDate).getTime() / 1000;
    //     data.startDate = newDate;
    //   }
    // }

    if (data.endDate != undefined && data.startDate != undefined) {
      data.endDate = Math.floor(new Date().getTime());
      data.startDate = Math.floor(new Date().getTime());
    }
    // data.state = 'AWARD';
    let isError = false;

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
          if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
            arrChoiceUser.forEach((user) => {
              reward({
                awardId: award.id,
                userId: user,
                awardState: 'AWARD',
              })
                .unwrap()
                .catch(() => {
                  isError = true;
                  toast.error(`Ошибка награждения ${user}`);
                });
            });
          }
          if (!isError) {
            push(`/award/${award.id}`);
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
      // back();
    }
    reset();
  };

  const onSubmitNominee: SubmitHandler<IAwardCreate> = async (data) => {
    let currentDate = Math.floor(new Date().getTime());

    // data.state = 'NOMINEE';

    // console.log('currentDate : ' + currentDate);

    if (data.endDate != undefined && data.startDate != undefined) {
      if (data.startDate == 0) {
        data.startDate = Math.floor(new Date().getTime());
        // console.log('startDate : ' + data.startDate);
      } else {
        data.startDate = new Date(data.startDate).getTime();
        // console.log('startDate : ' + data.startDate);
      }

      if (data.endDate == 0) {
        toast.error('Необходимо указать дату окончания!');
        // } else if (currentDate < (new Date(data.endDate).getTime())) {
      } else if (
        currentDate + 1000 >
        Math.round(new Date(data.endDate).getTime())
      ) {
        toast.error('Текущая дата больше чем дата окончания');
      } else {
        console.log(data.endDate);
        data.endDate = Math.round(new Date(data.endDate).getTime());
        // console.log('endDate : ' + data.endDate);

        let isError = false;
        console.log(data);

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
              if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
                arrChoiceUser.forEach((user) => {
                  reward({
                    awardId: award.id,
                    userId: user,
                    awardState: 'NOMINEE',
                  })
                    .unwrap()
                    .catch(() => {
                      isError = true;
                      toast.error(`Ошибка награждения ${user}`);
                    });
                });
              }
              if (!isError) {
                push(`/award/${award.id}`);
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
          // back();
        }
        reset();
      }
    }
  };

  return { onSubmitReward, onSubmitNominee };
};
