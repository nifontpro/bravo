import { FC, PropsWithChildren, useEffect } from 'react';
import { checkRole, TypeRoles } from '@/auth/model/auth.roles';
import { useAuthState } from '@/auth/data/auth.slice';

const AuthComponent: FC<PropsWithChildren<{ minRole: TypeRoles }>> = ({
  children,
  minRole,
}) => {
  const { user } = useAuthState();

  return checkRole(user?.role, minRole) ? <>{children}</> : null;
};

export default AuthComponent;
