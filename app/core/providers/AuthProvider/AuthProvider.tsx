import { FC, PropsWithChildren, useEffect } from 'react';
import { refreshApi } from '@/auth/data/auth.api';
import { getRefreshCookie } from '@/auth/data/auth.helper';
import { useSetAuthData } from '@/auth/presenter/useSetAuthData';
import Spinner from '@/core/presenter/ui/Spinner/Spinner';
import { useRouter } from 'next/router';
import { useAuthLoading, useAuthState } from '@/auth/data/auth.slice';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [refresh, { isLoading: loading, isError, isSuccess }] =
    refreshApi.useRefreshMutation();
  const { setAuthData } = useSetAuthData();

  // const isLoading = useAuthLoading();
  const { push } = useRouter();
  // const { user } = useAuthState();

  // useEffect(() => {
  //   if (isLoading == undefined) {
  //     console.log(isLoading);
  //   }
  //   if (!user && isLoading == false) {
  //     push('/auth');
  //     console.log('Redirect AuthComponent');
  //   }
  // }, [user, push, isLoading]);

  useEffect(() => {
    const refreshToken = getRefreshCookie();
    console.log(refreshToken);
    if (!refreshToken) {
      push('/auth');
      console.log('Redirect AuthComponent');
    }
    if (refreshToken) {
      refresh()
        .unwrap()
        .then(async (data) => {
          await setAuthData(data);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    <Spinner />;
  } else {
  }
  return <>{children}</>;
};

export default AuthProvider;
