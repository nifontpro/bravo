import { useCompanyState } from '@/company/data/company.slice';
import { useMemo } from 'react';
import { departmentApi } from '../data/department.api';
import { IDepartment } from '../model/department.types';

export const useDepartment = (filter: string) => {
  const { currentCompany } = useCompanyState();
  // let departmentInCompany: IDepartment[] = [];

  // if (currentCompany) {
  //Легкий запрос
  const { data: departments, isLoading } = departmentApi.useGetByCompanyQuery(
    currentCompany != null ? currentCompany.id : '', {skip: !currentCompany}
  );

  // }

  // departmentInCompany = departments || [];

  return useMemo(() => {
    let departmentInCompany: IDepartment[] = departments || [];

    return {
      isLoading,
      departmentInCompany,
    };
  }, [departments, isLoading]);
};
