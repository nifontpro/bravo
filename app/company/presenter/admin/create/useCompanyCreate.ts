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
import { useDispatch } from 'react-redux';
import { companyActions } from '@/company/data/company.slice';

export const useCompanyCreate = (setValue: UseFormSetValue<ICompanyCreate>) => {
  const { back } = useRouter();
  const [create] = companyApi.useCreateMutation();
  const [updateImage] = companyApi.useUpdateImageMutation();
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<ICompanyCreate> = async (data) => {
    let isError = false;
    console.log(data);

    await create({ ...data })
      .unwrap()
      .then(async (company: ICompany) => {
        const fileData = data.file[0];
        if (fileData) {
          const formData = new FormData();
          formData.append('imageUrl', fileData);
          await updateImage({ companyId: company.id, formData })
            .unwrap()
            .catch(() => { 
              isError = true;
              toast.error('Ошибка добавления фото компании');
            });
        }
        dispatch(companyActions.setState(company))
      })
      .catch((e) => {
        isError = true;
        toastError(e, 'Ошибка создания профиля сотрудника');
      });

    if (!isError) {
      toast.success('Компания успешно создана');
      back();
    }
  };

  return { onSubmit };
};
