import { useCompanyState } from '@/company/data/company.slice';
import { useEffect, useMemo, useState } from 'react';
import { activityApi } from '../data/activity.api';
import { IActivity } from '../model/activity.types';

const currentDate = Math.floor(new Date().getTime());

export const useActivity = (
  filter?: string,
  sort?: number,
  startDateProps?: number,
  endDateProps?: number
) => {
  const [state, setState] = useState<1 | -1>(1);
  const [startDate, setStartDate] = useState<number>(10000000);
  const [endDate, setEndDate] = useState<number>(16732673054000);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [arr, setArr] = useState<IActivity[]>([]); // Итоговый массив, который показывается
  // const [arrSearch, setArrSearch] = useState<IActivity[]>([]); // Массив по поиску
  // const [generalArr, setGeneralArr] = useState<IActivity[]>([]); // Массив по страницам загруженным
  const [sizePage, setSizePage] = useState<number>(20); // Кол элементов на странице

  const { currentCompany } = useCompanyState();

  //Получить активность в компании
  const { data: activity, isFetching } = activityApi.useGetAwardCountQuery({
    companyId: currentCompany!.id,
    // sort: sort || state,
    sort: -1,
    filter: filter || searchValue,
    startDate: startDateProps || startDate,
    endDate: endDateProps || endDate,
    page: currentPage,
    pageSize: sizePage,
    // });
  });

  const [active, setActive] = useState<
    '' | 'AWARD' | 'NOMINEE' | 'DELETE_USER'
  >('');

  const allActivityLength = arr.length;
  const awardsLength = arr?.filter((item) =>
    item.state?.includes('AWARD')
  ).length;
  const nomineeLength = arr?.filter((item) =>
    item.state?.includes('NOMINEE')
  ).length;
  const otherLength = arr?.filter((item) =>
    item.state?.includes('DELETE_USER')
  ).length;

  //Фитруем по категории
  let filteredValue = arr?.filter((item) => item.state?.includes(active));

  // Сотртировка по дате
  if (filteredValue) {
    filteredValue.sort((prev, next): number => {
      if (prev.date !== undefined && next.date !== undefined) {
        if (prev?.date > next?.date) return state; //(-1)
      }
      return state;
    });
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value != '') {
      // setStartDate(10000000)
      // setEndDate(16732673054000)
      setSearchValue(event.currentTarget.value);
      setCurrentPage(0);
    }
    if (event.currentTarget.value == '') {
      // setStartDate(10000000);
      // setEndDate(16732673054000);
      setSizePage(20);
      setArr([]);
      setCurrentPage(0);
      setSearchValue(event.currentTarget.value);
    }
  };

  //Пагинация
  useEffect(() => {
    if (startDate > 10000000 || endDate < 16732673054000) {
      setSizePage(100000000);
      setCurrentPage(0);
    } else {
      setSizePage(20);
    }
    if (activity) {
      if (startDate > 10000000 || endDate < 16732673054000) {
        setCurrentPage(0);
        setArr([...activity]);
      } else {
        setSizePage(20);
        if (activity.length > 0 && searchValue == '') {
          // setGeneralArr([...arr, ...activity]);
          setArr([...arr, ...activity]);
        }
        if (searchValue != '') {
          setSizePage(100000000);
          setArr([...activity]);
          // console.log(activity);
          setCurrentPage(0);
        }
      }
    }
  }, [activity]);

  const handleNextPage = () => {
    if (activity && activity.length > 0 && searchValue == '') {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // useEffect(() => {
  //   if (activity && activity.length > 0) {
  //     window.addEventListener('scroll', scrollHandler);
  //   }
  //   return function () {
  //     window.removeEventListener('scroll', scrollHandler);
  //   };
  // }, [activity]);

  // const scrollHandler = () => {
  //   if (
  //     document.documentElement.scrollTop + window.innerHeight + 1 >=
  //       document.documentElement.scrollHeight &&
  //     !isFetching
  //   ) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  // console.log(`Текущий массив :`);
  // console.log(arr);
  // console.log(`Текущая страница загрузки данных: ${currentPage}`);
  // console.log(`General массив :`);
  // console.log(generalArr);

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
      isFetching,
      setCurrentPage,
      handleNextPage,
      searchValue,
      startDate,
      endDate,
      setSizePage,
      setArr,
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
    isFetching,
    setCurrentPage,
    searchValue,
    startDate,
    endDate,
    setSizePage,
    setArr,
  ]);
};
