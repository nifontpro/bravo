import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser } from '@/user/model/user.types';
import { awardApi } from 'award/data/award.api';
import { IAward, IAwardUsers } from 'award/model/award.types';
import { IAwardCount } from 'award/model/count.types';

/**
 * Возвращает список руководителей компаний и сотрудников отдела
 */
export const useAward = (filter: string) => {
  const { currentCompany } = useCompanyState();
  let depAwardLight: IAward[] = [];
  let depAwardFull: IAwardUsers[] = [];
  let depAwardFullCompany: IAwardCount | undefined = undefined

  if (currentCompany) {
    //Легкий запрос
    const { data: awards } = awardApi.useGetAwardsByCompanyQuery({
      companyId: currentCompany.id,
    });

    //Подробный запрос с пользователями
    const { data: awardsFull } = awardApi.useGetAwardsByCompanyWithUserQuery({
      companyId: currentCompany != null ? currentCompany.id : ''
    });

    //Получить статистику о награждениях в компании
    const { data: awardsFullCompany } = awardApi.useGetAwardCountQuery(currentCompany.id);

    depAwardLight = awards || [];
    depAwardFull = awardsFull || [];
    depAwardFullCompany = awardsFullCompany
  }

  const awardsLight = depAwardLight;
  const awardsFull = depAwardFull;
  const awardsFullCompany = depAwardFullCompany;

  return useMemo(() => {
    return {
      awardsLight,
      awardsFull,
      awardsFullCompany,
    };
  }, [awardsLight, awardsFull, awardsFullCompany]);
};
