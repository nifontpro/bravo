import { useCompanyState } from '@/company/data/company.slice';
import { useMemo } from 'react';
import { activityApi } from '../data/activity.api';
import { IActivity } from '../model/activity.types';

const currentDate = Math.floor(new Date().getTime());

export const useActivity = (
  filter: string = '',
  sort: number = 1,
  startDate: number = 10000000,
  endDate: number = 16732673054000
) => {
  const { currentCompany } = useCompanyState();
  let depActivity: IActivity[] = [];

  if (currentCompany) {
    //Получить активность в компании
    const { data: activity } = activityApi.useGetAwardCountQuery({
      companyId: currentCompany.id,
      // companyId: '638621902741bb167c6c2386',
      sort: sort,
      filter: filter,
      startDate: startDate,
      endDate: endDate,
    });

    depActivity = activity || [];
  }

  const activity = depActivity;

  return useMemo(() => {
    return {
      activity,
    };
  }, [activity]);
};
