import { FC, PropsWithChildren, useEffect } from 'react';
import { checkRole, TypeRoles } from '@/auth/model/auth.roles';
import { useAuthState } from '@/auth/data/auth.slice';
import { useRouter } from 'next/router';

const AuthComponent: FC<PropsWithChildren<{ minRole: TypeRoles }>> = ({
  children,
  minRole,
}) => {
  const { user } = useAuthState();
  // const { push } = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     push('/auth');
  //   }
  //   console.log('Redirect')
  // }, [user, push]);

  return checkRole(user?.role, minRole) ? <>{children}</> : null;
};

export default AuthComponent;
