import { useCompanyState } from '@/company/data/company.slice';
import { useMemo } from 'react';
import { awardApi } from 'award/data/award.api';
import { IAward } from 'award/model/award.types';
import { IAwardCount } from 'award/model/count.types';

export const useAward = (filter: string) => {
  const { currentCompany } = useCompanyState();
  let depAwardLight: IAward[] = [];
  let depAwardFullCompany: IAwardCount | undefined = undefined;

  if (currentCompany) {
    //Легкий запрос
    const { data: awards } = awardApi.useGetAwardsByCompanyQuery({
      companyId: currentCompany.id,
    });

    //Получить статистику о награждениях в компании
    const { data: awardsFullCompany } = awardApi.useGetAwardCountQuery(
      currentCompany.id
    ); 

    depAwardLight = awards || [];
    depAwardFullCompany = awardsFullCompany;
  }

  const awardsLight = depAwardLight;
  const awardsFullCompany = depAwardFullCompany;

  return useMemo(() => {
    return {
      awardsLight,
      awardsFullCompany,
    };
  }, [awardsLight, awardsFullCompany]);
};
