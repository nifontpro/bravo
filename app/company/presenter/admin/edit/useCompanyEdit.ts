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
import { companyApi } from '@/company/data/company.api';
import { ICompany, ICompanyCreate } from '@/company/model/company.types';
import { ICompanyUpdateRequest } from './company-edit.type';

export const useCompanyEdit = (setValue: UseFormSetValue<ICompanyUpdateRequest>) => {
  const { push, back, query } = useRouter();
  const companyId = String(query.id);

  const [updateImg] = companyApi.useUpdateImageMutation();

  const {
    data: company,
    isLoading,
    isSuccess: isGetSuccess,
  } = companyApi.useGetByIdQuery(companyId);
  const [update] = companyApi.useUpdateMutation();

  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isGetSuccess && company) {
      setValue('name', company.name);
      setValue('email', company.email);
      setValue('phone', company.phone);
      setValue('address', company.address);
	  setImg(company.imageUrl)
    }
  }, [isGetSuccess, setValue]);
//   console.log(company)

  const onSubmit: SubmitHandler<ICompanyUpdateRequest> = async (data) => {
    console.log(data);
    let isError = false;
    if (company) {
      await update({...data, id: company.id})
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления профиля компании');
        });

      if (!isError) {
        toast.success('Данные компании успешно обновлены');
        await back();
      }
    }
  };

  const changePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    if (event.target.files !== null && company != undefined) {
      setImg(URL.createObjectURL(event.target.files[0]));
      const formData = new FormData();
      formData.append('imageUrl', event.target.files[0]);
      await updateImg({ companyId: company.id, formData })
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

  return { company, onSubmit, changePhoto, isLoading, img };
};
