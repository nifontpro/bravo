import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser, IUserAwards, IUserAwardsUnion } from '@/user/model/user.types';

/**
 * Возвращает список руководителей компаний и сотрудников отдела
 */
export const useMyUser = (filter: string) => {
  const { currentCompany } = useCompanyState();
  const { currentDepartment } = useDepartmentState();
  let depUsers: IUser[] = [];
  let depUserWithAwards: IUserAwards[] = [];
  let depUserWithAwardsUnion: IUserAwardsUnion[]  = [];

  // if (currentDepartment) {
  //   const { data: _depUsers } = userApi.useGetByDepartmentQuery({
  //     departmentId: currentDepartment.id,
  //     filter,
  //   });
  //   depUsers = _depUsers || [];
  // }

  // if (currentCompany) {
  //   const { data: _depUsers } = userApi.useGetByCompanyQuery({
  //     companyId: currentCompany.id,
  //     filter,
  //   });
  //   depUsers = _depUsers || [];
  // }

  if (currentCompany) {
    // Сотрудники без медалей
    const { data: users } = userApi.useGetByCompanyDepNameQuery({
      companyId: currentCompany.id,
      filter,
    });
    // Сотрудники c медалями
    const { data: usersWithAwards } =
      userApi.useGetByCompanyWithAwardsQuery({
        companyId: currentCompany.id,
      });

    // Сотрудники с подробной информацией
    const { data: usersWithAwardsUnion } =
      userApi.useGetByCompanyWithAwardsUnionQuery({
        companyId: currentCompany.id,
        filter,
      });

    depUsers = users || [];
    depUserWithAwards = usersWithAwards || [];
    depUserWithAwardsUnion = usersWithAwardsUnion || [];
  }

  // const { isLoading, data: _bosses } = userApi.useGetBossesQuery({
  //   companyId: currentCompany?.id,
  //   filter,
  // });
  // const bosses = _bosses || [];
  // const users = bosses.concat(depUsers);

  const users = depUsers;
  const usersWithAwards = depUserWithAwards;
  const usersWithAwardsUnion = depUserWithAwardsUnion

  return useMemo(() => {
    return {
      // isLoading,
      users,
      usersWithAwards,
      usersWithAwardsUnion
    };
    // }, [isLoading, users]);
  }, [users, usersWithAwards, usersWithAwardsUnion]);
};
