import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { awardApi } from 'award/data/award.api';
import { IAwardUpdate } from 'award/model/api.types';

export const useAwardEdit = (setValue: UseFormSetValue<IAwardUpdate>) => {
  const { push, query } = useRouter();
  const awardId = String(query.id);

  const [updateImg] = awardApi.useUpdateImageMutation();
  const [removeImg] = awardApi.useDeleteMainImageMutation();

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
  }, [isGetSuccess, setValue, award]);

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

  const removePhoto = async () => {
    let isError = false;
    if (award != undefined) {
      await removeImg(award.id)
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка удаления фотографии');
        });
      if (!isError) {
        toast.success('Фото успешно удалено');
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
        .catch((e) => {
          isError = true;
          toast.error(e + 'Ошибка обновления фотографии');
        });
      if (!isError) {
        toast.success('Фото успешно обновлено');
      }
    }
  };

  return { award, onSubmit, changePhoto, removePhoto, isLoading, img };
};
