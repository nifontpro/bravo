import { useCompanyState } from '@/company/data/company.slice';
import { useMemo, useState } from 'react';
import { activityApi } from '../data/activity.api';
import { IActivity } from '../model/activity.types';

const currentDate = Math.floor(new Date().getTime());

export const useActivity = (filter?: string, sort?: number, startDateProps?: number, endDateProps?: number) => {
  const [state, setState] = useState<1 | -1>(-1);
  const [startDate, setStartDate] = useState<number>(10000000);
  const [endDate, setEndDate] = useState<number>(16732673054000);
  const [searchValue, setSearchValue] = useState<string>('');

  const { currentCompany } = useCompanyState();
  let depActivity: IActivity[] = [];

  if (currentCompany) {
    //Получить активность в компании
    const { data: activity } = activityApi.useGetAwardCountQuery({
      companyId: currentCompany.id,
      // companyId: '638621902741bb167c6c2386',
      sort: sort || state,
      filter: filter || searchValue,
      startDate: startDateProps || startDate,
      endDate: endDateProps || endDate,
    });
    depActivity = activity || [];
  }
  const activity = depActivity;

  const [active, setActive] = useState<
    '' | 'AWARD' | 'NOMINEE' | 'DELETE_USER'
  >('');

  const allActivityLength = activity.length;
  const awardsLength = activity?.filter((item) =>
    item.state?.includes('AWARD')
  ).length;
  const nomineeLength = activity?.filter((item) =>
    item.state?.includes('NOMINEE')
  ).length;
  const otherLength = activity?.filter((item) =>
    item.state?.includes('DELETE_USER')
  ).length;

  //Фитруем по категории
  let filteredValue = activity?.filter((item) => item.state?.includes(active));

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return useMemo(() => {
    return {
      active,
      setActive,
      allActivityLength,
      awardsLength,
      nomineeLength,
      otherLength,
      state,
      setState,
      setStartDate,
      setEndDate,
      handleChange,
      filteredValue,
      activity,
    };
  }, [
    active,
    setActive,
    allActivityLength,
    awardsLength,
    nomineeLength,
    otherLength,
    state,
    setState,
    setStartDate,
    setEndDate,
    filteredValue,
    activity,
  ]);
};
