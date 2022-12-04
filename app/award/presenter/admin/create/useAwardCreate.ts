import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { userApi } from '@/user/data/user.api';
import { toastError } from '@/core/utils/toast-error';
import { IUser } from '@/user/model/user.types';
import { departmentApi } from '@/department/data/department.api';
import { IDepartmentCreate } from '@/department/model/department.types';
import { ICompany, ICompanyCreate } from '@/company/model/company.types';
import { companyApi } from '@/company/data/company.api';
import { IAwardCreate } from 'award/model/api.types';
import { awardApi } from 'award/data/award.api';
import { IAward } from 'award/model/award.types';

export const useAwardCreate = (
  setValue: UseFormSetValue<IAwardCreate>,
  reset: UseFormReset<IAwardCreate>,
  companyId?: string,
) => {
  const { back } = useRouter();

  useEffect(() => {
    if (companyId) {
      let currentDate = new Date().getTime();
      setValue('companyId', companyId);
    }
  }, [companyId, setValue]);

  const [create] = awardApi.useCreateMutation();
  const [updateImage] = awardApi.useUpdateImageMutation();

  const onSubmit: SubmitHandler<IAwardCreate> = async (data) => {
    if (data.endDate == '') {
      setValue('endDate', 0);
    }
    if (data.startDate == '') {
      setValue('startDate', 0);
    }

    let isError = false;
    console.log(data);

    // if (companyId) {
    //   await create({ ...data })
    //     .unwrap()
    //     .then(async (award: IAward) => {
    //       const fileData = data.file[0];
    //       if (fileData) {
    //         const formData = new FormData();
    //         formData.append('imageUrl', fileData);
    //         await updateImage({ awardId: award.id, formData })
    //           .unwrap()
    //           .catch(() => {
    //             isError = true;
    //             toast.error('Ошибка добавления фото награды');
    //           });
    //       }
    //     })
    //     .catch((e) => {
    //       isError = true;
    //       toastError(e, 'Ошибка создания награды');
    //     });
    // } else {
    //   isError = true;
    //   toast.error('Необходимо выбрать компанию');
    // }
    // if (!isError) {
    //   toast.success('Награда успешно создана');
    //   // push('/company/' + companyId).then();
    //   back();
    // }
    reset()
  };

  return { onSubmit };
};
