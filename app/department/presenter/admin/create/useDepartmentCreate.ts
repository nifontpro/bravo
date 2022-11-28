import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { userApi } from '@/user/data/user.api';
import { toastError } from '@/core/utils/toast-error';
import { IUser } from '@/user/model/user.types';

export const useDepartmentCreate = (
  setValue: UseFormSetValue<IUserCreateInput>,
  companyId?: string
) => {
  const { back } = useRouter();
  const [create] = userApi.useCreateMutation();

  useEffect(() => {
    setValue('companyId', companyId);
  }, [setValue]);

  const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {
    let isError = false;
    console.log(data)

    // if (companyId) {
    //   await create({ ...data })
    //     .unwrap()
    //     .catch((e) => {
    //       isError = true;
    //       toastError(e, 'Ошибка создания профиля сотрудника');
    //     });
    // } else {
    //   isError = true;
    //   toast.error('Необходимо выбрать компанию');
    // }
    // if (!isError) {
    //   toast.success('Профиль сотрудника успешно создан');
    //   // push('/company/' + companyId).then();
    //   back();
    // }
  };

  return { onSubmit };
};
