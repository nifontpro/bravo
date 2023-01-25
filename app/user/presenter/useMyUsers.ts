import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser, IUserAwards, IUserAwardsUnion } from '@/user/model/user.types';
import { IUserAwardCount, IUserAwardsCountDep } from '../model/count.types';

export const useMyUser = (filter: string) => {
  const { currentCompany } = useCompanyState();
  // const { currentDepartment } = useDepartmentState();
  // let users: IUser[] = [];
  // let usersWithAwards: IUserAwards[] = [];
  // let usersWithAwardsUnion: IUserAwardsUnion[] = [];

  // const {data: rewardInfo} = rewardApi.useGetRewardInfoQuery(id || '', {skip: !id})

  // const { data: awards } = awardApi.useGetAwardsByCompanyQuery(
  //   { companyId: user.companyId || '' },
  //   { skip: !user.companyId }
  // );

  // if (currentCompany) {
  // Сотрудники без медалей
  const { data: depUsers } = userApi.useGetByCompanyDepNameQuery({
    companyId: currentCompany != null ? currentCompany.id : '',
    filter,
  }, {skip: !currentCompany});

  // Сотрудники c медалями
  const { data: depUserWithAwards } = userApi.useGetByCompanyWithAwardsQuery({
    companyId: currentCompany != null ? currentCompany.id : '',
  }, {skip: !currentCompany}); 

  // Сотрудники с подробной информацией
  const { data: depUserWithAwardsUnion } =
    userApi.useGetByCompanyWithAwardsUnionQuery({
      companyId: currentCompany != null ? currentCompany.id : '',
      filter,
    }, {skip: !currentCompany});

  // Сотрудник по ID
  // const {
  //   data: userWithId,
  //   isLoading,
  //   isSuccess: isGetSuccess,
  // } = userApi.useGetByIdQuery(filter); 

  // Получить информацию о награжденных сотрудниках в компании, с группировкой по отделам
  const { data: depCountAwardsOnDepCompany } =
    userApi.useGetAwardCountByCompanyDepGroupQuery(
      currentCompany != null ? currentCompany.id : '', {skip: !currentCompany}
    );

  // users = depUsers || [];
  // usersWithAwards = depUserWithAwards || [];
  // usersWithAwardsUnion = depUserWithAwardsUnion || [];
  // }

  // const users = depUsers;
  // const usersWithAwards = depUserWithAwards;
  // const usersWithAwardsUnion = depUserWithAwardsUnion;

  return useMemo(() => {
    let users: IUser[] = depUsers || [];
    // let userId: IUser = userWithId || undefined;
    let usersWithAwards: IUserAwards[] = depUserWithAwards || [];
    let usersWithAwardsUnion: IUserAwardsUnion[] = depUserWithAwardsUnion || [];
    let usersCountAwardsOnDepCompany: IUserAwardsCountDep[] = depCountAwardsOnDepCompany || [];

    return {
      // isLoading,
      users,
      usersWithAwards,
      usersWithAwardsUnion,
      usersCountAwardsOnDepCompany,
    };
  }, [depUsers, depUserWithAwards, depUserWithAwardsUnion, depCountAwardsOnDepCompany]);
};
