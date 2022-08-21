import {FC, PropsWithChildren} from 'react';
import {checkRole, TypeRoles} from "@/auth/model/auth.roles";
import {useAuthState} from "@/auth/data/auth.slice";

const AuthPage: FC<PropsWithChildren<{ minRole: TypeRoles }>> = ({children, minRole}) => {
	const {user} = useAuthState()

	return checkRole(user?.role, minRole) ?
		<>{children}</>
		:
		// <Error401/>
		null
}

export default AuthPage;