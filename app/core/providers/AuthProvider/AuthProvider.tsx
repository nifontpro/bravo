import { FC, PropsWithChildren, useEffect } from 'react';
import { refreshApi } from '@/auth/data/auth.api';
import { getRefreshCookie } from '@/auth/data/auth.helper';
import { useSetAuthData } from '@/auth/presenter/useSetAuthData';
import { useAuthState } from '@/auth/data/auth.slice';
import Auth from '@/auth/presenter/Auth';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [refresh] = refreshApi.useRefreshMutation();
  const { setAuthData } = useSetAuthData();

  const { user } = useAuthState(); 

  useEffect(() => {
    const refreshToken = getRefreshCookie();
    if (refreshToken) {
      refresh()
        .unwrap()
        .then(async (data) => {
          await setAuthData(data);
        });
    }
    console.log('Авторизация')
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

export default AuthProvider;
