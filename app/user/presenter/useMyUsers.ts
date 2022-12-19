import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser, IUserAwards, IUserAwardsUnion } from '@/user/model/user.types';
import { IUserAwardCount } from '../model/count.types';

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
  });
  // Сотрудники c медалями
  const { data: depUserWithAwards } = userApi.useGetByCompanyWithAwardsQuery({
    companyId: currentCompany != null ? currentCompany.id : '',
  });

  // Сотрудники с подробной информацией
  const { data: depUserWithAwardsUnion } =
    userApi.useGetByCompanyWithAwardsUnionQuery({
      companyId: currentCompany != null ? currentCompany.id : '',
      filter,
    });

  // Сотрудник по ID
  // const {
  //   data: userWithId,
  //   isLoading,
  //   isSuccess: isGetSuccess,
  // } = userApi.useGetByIdQuery(filter);

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

    return {
      // isLoading,
      users,
      usersWithAwards,
      usersWithAwardsUnion,
    };
  }, [depUsers, depUserWithAwards, depUserWithAwardsUnion]);
};
