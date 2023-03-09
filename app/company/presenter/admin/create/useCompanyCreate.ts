import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { ICompany, ICompanyCreate } from '@/company/model/company.types';
import { companyApi } from '@/company/data/company.api';
import { useDispatch } from 'react-redux';
import { companyActions } from '@/company/data/company.slice';

export const useCompanyCreate = (
  setValue: UseFormSetValue<ICompanyCreate>,
  uploadImg: File | undefined
) => {
  const { back } = useRouter();
  const [create] = companyApi.useCreateMutation();
  const [updateImage] = companyApi.useUpdateImageMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ICompanyCreate> = async (data) => {
    let isError = false;
    console.log(data);

    await create({ ...data })
      .unwrap()
      .then(async (company: ICompany) => {
        if (uploadImg) {
          const formData = new FormData();
          formData.append('imageUrl', uploadImg);
          await updateImage({ companyId: company.id, formData })
            .unwrap()
            .catch(() => {
              isError = true;
              toast.error('Ошибка добавления фото компании');
            });
        }
        dispatch(companyActions.setState(company));
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
