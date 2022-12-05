import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { IAward } from 'award/model/award.types';
import { awardApi } from 'award/data/award.api';
import { IAwardUpdate } from 'award/model/api.types';

export const useAwardEdit = (setValue: UseFormSetValue<IAwardUpdate>) => {
  const { push, query } = useRouter();
  const awardId = String(query.id);

  const [updateImg] = awardApi.useUpdateImageMutation();

  const {
    data: award,
    isLoading,
    isSuccess: isGetSuccess,
  } = awardApi.useGetAwardByIdQuery(awardId);

  const [update] = awardApi.useUpdateMutation();

  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isGetSuccess && award) {
      setValue('name', award.name);
      setValue('description', award.description);
      setValue('criteria', award.criteria);
      setImg(award.imageUrl);
    }
  }, [isGetSuccess, setValue]);
  //   console.log(award)

  const onSubmit: SubmitHandler<IAwardUpdate> = async (data) => {
    console.log(data);
    let isError = false;
    if (award) {
      await update({ ...data, id: award.id })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления награды');
        });

      if (!isError) {
        toast.success('Данные награды успешно обновлены');
        await push('/award/' + award.id);
      }
    }
  };

  const changePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    if (event.target.files !== null && award != undefined) {
      setImg(URL.createObjectURL(event.target.files[0]));
      const formData = new FormData();
      formData.append('imageUrl', event.target.files[0]);
      await updateImg({ awardId: award.id, formData })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления фотографии');
        });
      if (!isError) {
        toast.success('Фото успешно обновлено');
      }
    }
  };

  return { award, onSubmit, changePhoto, isLoading, img };
};
