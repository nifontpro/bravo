import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAdminUrl } from '@/core/config/url.config';
import { userApi } from '@/user/data/user.api';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { push, query } = useRouter();
  const userId = String(query.id);

  const [updateImg] = userApi.useUpdateImageMutation();

  const {
    data: user,
    isLoading,
    isSuccess: isGetSuccess,
  } = userApi.useGetByIdQuery(userId);
  const [update] = userApi.useUpdateMutation();

  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isGetSuccess && user) {
      setValue('password', undefined);
      setValue('name', user.name);
      setValue('companyId', user.companyId);
      setValue('login', user.login);
      setValue('email', user.email);
      setValue('post', user.post);
      setValue('gender', user.gender);
      setValue('phone', user.phone);
      setValue('description', user.description);
      setValue('departmentId', user.departmentId);
      setValue('lastname', user.lastname);
      setValue('patronymic', user.patronymic);
      setImg(user.imageUrl)
    }
  }, [user, isGetSuccess, setValue]);

  const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
    console.log(data);
    let isError = false;

    await update({ id: userId, ...data })
      .unwrap()
      .catch(() => {
        isError = true;
        toast.error('Ошибка обновления профиля сотрудника');
      });

    if (!isError) {
      toast.success('Профиль сотрудника успешно обновлен');
      await push('/company/' + data.companyId);
    }
  };

  const changePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    if (event.target.files !== null && user != undefined) {
      setImg(URL.createObjectURL(event.target.files[0]));
      const formData = new FormData();
      formData.append('imageUrl', event.target.files[0]);
      await updateImg({ userId: user.id, formData })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления фотографии');
        });
      if (!isError) {
        toast.success('Фото успешно обновлен');
      }
    }
  };

  return { onSubmit, changePhoto, isLoading, user, img };
};
