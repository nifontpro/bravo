import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { IAwardCreate } from 'award/model/api.types';
import { awardApi } from 'award/data/award.api';
import { IAward } from 'award/model/award.types';
import { dateActions, useEndDateState, useStartDateState } from './dataCreateAward.slice';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { convertCorrectDataForUnix } from '@/core/utils/convertCorrectDataForUnix';

export const useAwardCreate = (
  setValue: UseFormSetValue<IAwardCreate>,
  reset: UseFormReset<IAwardCreate>,
  companyId?: string,
  arrChoiceUser?: string[]
) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const startDateSelect = useStartDateState();
  const endDateSelect = useEndDateState();

  const [img, setImg] = useState<string>('');

  const changePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length > 0) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (companyId) {
      setValue('companyId', companyId);
      dispatch(dateActions.resetDate());
    }
  }, [companyId, setValue, dispatch]);

  const [create] = awardApi.useCreateMutation();
  const [updateImage] = awardApi.useUpdateImageMutation();
  const [reward] = awardApi.useAwardUserMutation();

  const onSubmitReward: SubmitHandler<IAwardCreate> = async (data) => {
    if (data.endDate != undefined && data.startDate != undefined) {
      data.endDate = Math.floor(new Date().getTime());
      data.startDate = Math.floor(new Date().getTime());
    }
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
    }
    reset();
  };

  const onSubmitNominee: SubmitHandler<IAwardCreate> = async (data) => {
    let currentDate = Math.floor(new Date().getTime());

    if (endDateSelect.length > 0) {
      data.endDate =
        dayjs(dayjs(convertCorrectDataForUnix(endDateSelect))).unix() * 1000;
    }
    if (startDateSelect.length > 0) {
      data.startDate =
        dayjs(dayjs(convertCorrectDataForUnix(startDateSelect))).unix() * 1000;
    }

    if (data.endDate == undefined) {
      toast.error('Необходимо указать дату окончания!');
    }

    if (data.endDate != undefined && data.startDate == undefined) {
      data.startDate = Math.floor(new Date().getTime());
      data.endDate =
        dayjs(dayjs(convertCorrectDataForUnix(endDateSelect))).unix() * 1000;
    }

    if (data.endDate != undefined && data.startDate != undefined) {
      if (data.endDate < data.startDate) {
        toast.error('Дата начала больше чем дата окончания');
      }
    }

    let isError = false;

    if (
      companyId &&
      data.endDate != undefined &&
      data.startDate != undefined &&
      data.endDate > data.startDate
    ) {
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
      // toast.error('Необходимо выбрать компанию');
    }
    if (!isError) {
      toast.success('Награда успешно создана');
      // reset();
      dispatch(dateActions.resetDate());
    }
  };

  // const onSubmitNominee: SubmitHandler<IAwardCreate> = async (data) => {
  //   let currentDate = Math.floor(new Date().getTime());

  //   if (data.endDate != undefined && data.startDate != undefined) {
  //     if (data.startDate == 0) {
  //       data.startDate = Math.floor(new Date().getTime());
  //     } else {
  //       data.startDate = new Date(data.startDate).getTime();
  //     }

  //     if (data.endDate == 0) {
  //       toast.error('Необходимо указать дату окончания!');
  //     } else if (
  //       currentDate + 1000 >
  //       Math.round(new Date(data.endDate).getTime())
  //     ) {
  //       toast.error('Текущая дата больше чем дата окончания');
  //     } else {
  //       console.log(data.endDate);
  //       data.endDate = Math.round(new Date(data.endDate).getTime());

  //       let isError = false;
  //       console.log(data);

  //       //     if (companyId) {
  //       //       await create({ ...data })
  //       //         .unwrap()
  //       //         .then(async (award: IAward) => {
  //       //           const fileData = data.file[0];
  //       //           if (fileData) {
  //       //             const formData = new FormData();
  //       //             formData.append('imageUrl', fileData);
  //       //             await updateImage({ awardId: award.id, formData })
  //       //               .unwrap()
  //       //               .catch(() => {
  //       //                 isError = true;
  //       //                 toast.error('Ошибка добавления фото награды');
  //       //               });
  //       //           }
  //       //           if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
  //       //             arrChoiceUser.forEach((user) => {
  //       //               reward({
  //       //                 awardId: award.id,
  //       //                 userId: user,
  //       //                 awardState: 'NOMINEE',
  //       //               })
  //       //                 .unwrap()
  //       //                 .catch(() => {
  //       //                   isError = true;
  //       //                   toast.error(`Ошибка награждения ${user}`);
  //       //                 });
  //       //             });
  //       //           }
  //       //           if (!isError) {
  //       //             push(`/award/${award.id}`);
  //       //           }
  //       //         })
  //       //         .catch((e) => {
  //       //           isError = true;
  //       //           toastError(e, 'Ошибка создания награды');
  //       //         });
  //       //     } else {
  //       //       isError = true;
  //       //       toast.error('Необходимо выбрать компанию');
  //       //     }
  //       //     if (!isError) {
  //       //       toast.success('Награда успешно создана');
  //       //     }
  //       //     reset();
  //     }
  //   }
  // };

  return { onSubmitReward, onSubmitNominee, changePhoto, img };
};
