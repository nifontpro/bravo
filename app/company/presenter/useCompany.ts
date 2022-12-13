
import { useCompanyState } from '@/company/data/company.slice';
import { useMemo } from 'react';
import { companyApi } from '../data/company.api';
import { ICompany } from '../model/company.types';


export const useCompany = (filter: string) => {
  const { currentCompany } = useCompanyState();
  let depCompany: ICompany[] = [];

  if (currentCompany) {
    //Легкий запрос
    const { data: companies } = companyApi.useGetByOwnerQuery();
    

    depCompany = companies || [];
  }

  const companies = depCompany;

  return useMemo(() => {
    return {
      companies,
    };
}, [companies]);
};
