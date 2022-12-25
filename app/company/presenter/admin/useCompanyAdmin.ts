import { ChangeEvent, useMemo, useState } from 'react';
import { companyApi } from '@/company/data/company.api';
import { toast } from 'react-toastify';
import { toastError } from '@/core/utils/toast-error';
import { useRouter } from 'next/router';
import { getAdminUrl } from '@/core/config/url.config';
import { useDebounce } from '@/core/hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { companyActions } from '@/company/data/company.slice';
import { departmentActions } from '@/department/data/department.slice';
import { departmentApi } from '@/department/data/department.api';

export const useCompanyAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const dispatch = useDispatch();

  const { isLoading, data: companies } =
    companyApi.useGetOwnerAdminQuery(debouncedSearch);
  const [createCompany] = companyApi.useCreateMutation();
  const [deleteCompany] = companyApi.useDeleteMutation();

  const { back, push } = useRouter();

  return useMemo(() => {
    // const createAsync = async () => {
    // 	await createCompany()
    // 		.unwrap()
    // 		.then(response => {
    // 			toast.success("Компания успешно создана")
    // 			push(getAdminUrl(`company/edit/${response.id}`))
    // 		})
    // 		.catch(e => {
    // 			toastError(e, "Ошибка при создании компании")
    // 		})
    // }

    const deleteAsync = async (id: string) => {
      let isError = false;

      await deleteCompany(id)
        .unwrap()
        .then(() => {
          dispatch(companyActions.clear());
          dispatch(departmentActions.clear());
          // dispatch(companyApi.util.resetApiState());
          // dispatch(departmentApi.util.resetApiState());
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка при удалении компании');
        });

      if (!isError) {
        toast.success('Компания успешно удалена');
        back();
      }
    };

    return {
      isLoading,
      companies,
      handleSearch,
      searchTerm,
      // createAsync,
      deleteAsync,
    };
  }, [isLoading, companies, searchTerm, createCompany, deleteCompany, push]);
};
