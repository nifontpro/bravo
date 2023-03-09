import { useCompanyState } from '@/company/data/company.slice';
import { userApi } from '@/user/data/user.api';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { DataSheets } from '../inputExls.types';

export const useModalWindowExcelAddUsers = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  departSort: string,
  data: DataSheets[] | undefined,
) => {
  const { currentCompany } = useCompanyState();
  const [create] = userApi.useCreateMutation();

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const onSubmitAdded = async () => {
    let isError = false;

    if (data && data.length == 0) {
      toast.error(`Выберите сотрудников для номинации`);
    }

    if (data != undefined && data?.length > 0 && currentCompany) {
      data.forEach((user) => {
        create({
          test: true,
          companyId: currentCompany.id,
          phone: user.Телефон,
          email: user.email,
          login: user.email,
          name: user.Имя,
          lastname: user.Фамилия,
          patronymic: user.Отчество,
          description: user['О сотруднике'],
          departmentId: departSort,
          role: 'user',
          isMNC: false,
          gender: 'UNDEFINED',
          post: user.Должность
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error(`Ошибка создания ${user.Фамилия}`);
          });
      });
      setVisibleModal(false);
      if (!isError) {
        toast.success('Добавление успешно');
      }
    }
  };

  return { handleCancel, onSubmitAdded };
};
