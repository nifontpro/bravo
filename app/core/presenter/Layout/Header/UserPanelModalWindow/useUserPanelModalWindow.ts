import { authActions } from '@/auth/data/auth.slice';
import { companyApi } from '@/company/data/company.api';
import { companyActions } from '@/company/data/company.slice';
import {
  getUserEditPasswordUrl,
  getUserEditUrl,
  getUserUrl,
} from '@/core/config/api.config';
import { departmentApi } from '@/department/data/department.api';
import { departmentActions } from '@/department/data/department.slice';
import { userApi } from '@/user/data/user.api';
import { IUser } from '@/user/model/user.types';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

export const useUserPanelModalWindow = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  user: IUser | undefined
) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleClickProfile = () => {
    push(getUserUrl(`/${user?.id}`));
    setVisibleModal(false);
  };

  const handleClickEditProfile = () => {
    push(getUserEditUrl(`/${user?.id}`));
    setVisibleModal(false);
  };

  const handleClickEditPassword = () => {
    push(getUserEditPasswordUrl(`/${user?.id}`));
    setVisibleModal(false);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(companyActions.clear());
    dispatch(departmentActions.clear());
    dispatch(companyApi.util.resetApiState());
    dispatch(departmentApi.util.resetApiState());
    dispatch(userApi.util.resetApiState());
    push('/auth');
  };

  return {
    handleClickProfile,
    handleClickEditProfile,
    handleClickEditPassword,
    handleLogout,
  };
};
