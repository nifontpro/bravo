import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { IDepartmentEditInput } from '@/department/presenter/admin/edit/department-edit.type';
import { useRouter } from 'next/router';
import { departmentApi } from '@/department/data/department.api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAdminUrl } from '@/core/config/url.config';

export const useDepartmentEdit = (
  setValue: UseFormSetValue<IDepartmentEditInput>
) => {
  const { push, back, query } = useRouter();
  const departmentId = String(query.id);

  const {
    data: department,
    isLoading,
    isSuccess: isGetSuccess,
  } = departmentApi.useGetByIdQuery(departmentId);
  const [update] = departmentApi.useUpdateMutation();
  const [updateImage] = departmentApi.useUpdateImageMutation();

  useEffect(() => {
    if (isGetSuccess && department) {
      setValue('name', department.name);
      setValue('description', department.description);
    }
  }, [department, isGetSuccess, setValue]);

  const onSubmit: SubmitHandler<IDepartmentEditInput> = async (data) => {
    let isError = false;

    await update({
      id: departmentId,
      ...data,
      companyId: department?.companyId || '',
    })
      .unwrap()
      .then(async () => {
        const fileData = data.file[0];
        if (fileData) {
          const formData = new FormData();
          formData.append('imageUrl', fileData);
          await updateImage({ departmentId, formData })
            .unwrap()
            .catch(() => {
              isError = true;
              toast.error('Ошибка обновления фото отдела');
            });
        }
      })
      .catch(() => {
        isError = true;
        toast.error('Ошибка обновления отдела');
      });

    if (!isError) {
      toast.success('Отдел успешно обновлен');
    }
    back();
  };

  return { department, onSubmit, isLoading };
};
