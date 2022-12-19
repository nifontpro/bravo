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
import { getAdminUrl } from '@/core/config/url.config';
import { userApi } from '@/user/data/user.api';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';
import { useCompanyState } from '@/company/data/company.slice';
import { getUserUrl } from '@/core/config/api.config';

export const useUserEditPassword = (
  setValue: UseFormSetValue<{
    userId: string;
    password: string;
    newPassword: string;
    repeatNewPassword: string;
    test?: boolean;
  }>
) => {
  const { push, query } = useRouter();
  const userId = String(query.id);
  // console.log(query.id)

  const {
    data: user,
    isLoading,
    isSuccess: isGetSuccess,
  } = userApi.useGetByIdQuery(userId);
  const [update] = userApi.useUpdatePasswordMutation();

  useEffect(() => {
    if (isGetSuccess && user) {
      setValue('userId', user.id);
    }
  }, [user, isGetSuccess, setValue]);

  const onSubmit: SubmitHandler<{
    userId: string;
    password: string;
    newPassword: string;
    repeatNewPassword: string;
    test?: boolean;
  }> = async (data) => {
    console.log(data);
    let isError = false;
    if (data.newPassword == data.repeatNewPassword) {
      await update({ userId: String(query.id), password: data.password, newPassword: data.newPassword })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления профиля сотрудника');
        });
      if (!isError) {
        toast.success('Профиль сотрудника успешно обновлен');
        await push(getUserUrl(`/${userId}`));
      }
    } else {
      toast.error('Пароли не совпадают');
    }
  };

  return { onSubmit, isLoading, user };
};
