
import { useCompanyState } from '@/company/data/company.slice';
import { useMemo } from 'react';
import { departmentApi } from '../data/department.api';
import { IDepartment } from '../model/department.types';


export const useDepartment = (filter: string) => {
  const { currentCompany } = useCompanyState();
  let depDepartInCompany: IDepartment[] = [];

  if (currentCompany) {
    //Легкий запрос
    const { data: departments, isLoading } = departmentApi.useGetByCompanyQuery(
      currentCompany.id
    );
    

    depDepartInCompany = departments || [];
  }

  const departmentInCompany = depDepartInCompany;

  return useMemo(() => {
    return {
      departmentInCompany,
    };
}, [departmentInCompany]);
};
