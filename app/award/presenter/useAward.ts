import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser } from '@/user/model/user.types';
import { awardApi } from 'award/data/award.api';
import { IAward, IAwardUsers } from 'award/model/award.types';

/**
 * Возвращает список руководителей компаний и сотрудников отдела
 */
export const useAward = (filter: string) => {
  const { currentCompany } = useCompanyState();
  let depAwardLight: IAward[] = [];
  let depAwardFull: IAwardUsers[] = [];

  if (currentCompany) {
    //Легкий запрос
    const { data: awards } =
    awardApi.useGetAwardsByCompanyQuery({
      companyId: currentCompany.id,
    });
    
    //Подробный запрос с пользователями
    const { data: awardsFull } =
    awardApi.useGetAwardsByCompanyWithUserQuery({
      companyId: currentCompany.id,
    });

    depAwardLight = awards || [];
    depAwardFull = awardsFull || []
  }

  const awardsLight = depAwardLight;
  const awardsFull = depAwardFull;

  return useMemo(() => {
    return {
      awardsLight,
      awardsFull
    };
}, [awardsLight, awardsFull]);
};
