import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { userApi } from '@/user/data/user.api';
import { toastError } from '@/core/utils/toast-error';
import { IUser, IUserCreate } from '@/user/model/user.types';
import { registerApi } from 'register/data/register.api';

export const useResetPassword = (
  router: NextRouter,
  setValue: UseFormSetValue<{
    userId: string;
    code: string;
    password: string;
  }>
) => {
  const { push } = useRouter();

  const [passwordReset] = registerApi.usePasswordResetStepTwoMutation();

  useEffect(() => {
    if (
      router.query.userId != undefined &&
      typeof router.query.userId == 'string' &&
      router.query.resetToken != undefined &&
      typeof router.query.resetToken == 'string'
    ) {
      setValue('userId', router.query.userId);
      setValue('code', router.query.resetToken);
    }
  }, [setValue, router.query.userId, router.query.resetToken]);

  const onSubmit: SubmitHandler<{
    userId: string;
    code: string;
    password: string;
  }> = async (data) => {
    let isError = false;
    console.log(data);

    await passwordReset({ ...data })
      .unwrap()
      .catch((e) => {
        isError = true;
        toastError(e, 'Ошибка обновления пароля');
      });
    if (!isError) {
      toast.success('Пароль успешно обновлен');
      // push('/company/' + companyId).then();
      push('/auth');
    }
  };

  return { onSubmit };
};
