import { userApi } from '@/user/data/user.api';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useMemo } from 'react';
import { IUser } from '@/user/model/user.types';

/**
 * Возвращает список руководителей компаний и сотрудников отдела
 */
export const useMyUser = (filter: string) => {
  const { currentCompany } = useCompanyState();
  const { currentDepartment } = useDepartmentState();
  let depUsers: IUser[] = [];

  // if (currentDepartment) {
  //   const { data: _depUsers } = userApi.useGetByDepartmentQuery({
  //     departmentId: currentDepartment.id,
  //     filter,
  //   });
  //   depUsers = _depUsers || [];
  // }

  if (currentCompany) {
    const { data: _depUsers } = userApi.useGetByCompanyQuery({
      companyId: currentCompany.id,
      filter,
    });
    depUsers = _depUsers || [];
  }


  const { isLoading, data: _bosses } = userApi.useGetBossesQuery({
    companyId: currentCompany?.id,
    filter,
  });
  // const bosses = _bosses || [];
  // const users = bosses.concat(depUsers);

  const users = depUsers;

  return useMemo(() => {
    return {
      isLoading,
      users,
    };
  }, [isLoading, users]);
};
