import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { userApi } from '@/user/data/user.api';
import { toastError } from '@/core/utils/toast-error';
import { IUser } from '@/user/model/user.types';

export const useUserCreate = (
  setValue: UseFormSetValue<IUserCreateInput>,
  active: 'MALE' | 'FEMALE' | 'UNDEFINED' | undefined,
  companyId?: string
  // departmentId?: string,
) => {
  const { push, back } = useRouter();
  const [create] = userApi.useCreateMutation();
  const [updateImage] = userApi.useUpdateImageMutation();

  useEffect(() => {
    setValue('role', 'user');
    // setValue('companyId', companyId);
    // setValue('isMNC', false)
    // if (active != undefined) {
    //   setValue('gender', active);
    // }
  }, [setValue]);

  const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {
    let isError = false;
    if (active != undefined) {
      data.gender = active;
    }

    if (companyId) {
      data.companyId = companyId
      await create({ ...data })
        .unwrap()
        .then(async (user: IUser) => {
          const fileData = data.file[0];
          if (fileData) {
            const formData = new FormData();
            formData.append('imageUrl', fileData);
            await updateImage({ userId: user.id, formData })
              .unwrap()
              .catch(() => {
                isError = true;
                toast.error('Ошибка добавления фото сотрудника');
              });
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания профиля сотрудника');
        });
    } else {
      isError = true;
      toast.error('Необходимо выбрать компанию');
    }
    if (!isError) {
      toast.success('Профиль сотрудника успешно создан');
      // push('/company/' + companyId).then();
      back();
    }
  };

  return { onSubmit };
};
