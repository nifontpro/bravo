import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { getAdminUrl } from '@/core/config/url.config';
import { userApi } from '@/user/data/user.api';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { push, query } = useRouter();
  const userId = String(query.id);
  // console.log(query.id)

  const [updateImg] = userApi.useUpdateImageMutation();
  const [removeImg] = userApi.useDeleteMainImageMutation();


  const [active, setActive] = useState<
    'MALE' | 'FEMALE' | 'UNDEFINED' | undefined
  >('MALE');

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
      setImg(user.imageUrl);
      setActive(user.gender);
    }
  }, [user, isGetSuccess, setValue]);

  const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
    // console.log(data);
    let isError = false;
    if (active != undefined) {
      data.gender = active;
    }

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

  const removePhoto = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    let isError = false;
    if (user != undefined) {
      await removeImg(user.id)
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

  return { onSubmit, changePhoto, setActive, removePhoto, active, isLoading, user, img };
};
