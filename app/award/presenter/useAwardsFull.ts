import { useCompanyState } from '@/company/data/company.slice';
import { useMemo, useState } from 'react';
import { awardApi } from 'award/data/award.api';
import { IAwardUsers } from 'award/model/award.types';

export const useAwardsFull = (currentPage: number = 0) => {
  const { currentCompany } = useCompanyState();
//   let depAwardFull: IAwardUsers[] = [];
//   const [loading, setLoading] = useState<boolean>(false)

  const [direction, setDirection] = useState<1 | -1>(-1)

//   if (currentCompany) {
    //Подробный запрос с пользователями
    const { data: awardsFull, isFetching } =
      awardApi.useGetAwardsByCompanyWithUserBaseQuery({
        companyId: currentCompany != null ? currentCompany.id : '',
        page: currentPage,
        pageSize: 12,
        // filter: '123',
        field: 'startDate',
        direction: direction,
      }, {skip: !currentCompany});
    // depAwardFull = awardsFull || [];
    // setLoading(isLoading)
//   }

//   const awardsFull = depAwardFull;

  return useMemo(() => {
    return {
      awardsFull,
      direction,
      setDirection,
      isFetching
    };
  }, [awardsFull, direction, setDirection, isFetching]);
};
