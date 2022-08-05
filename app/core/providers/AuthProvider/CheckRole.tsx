import {FC, PropsWithChildren} from 'react';
import {useRouter} from "next/router";
import {checkRole, TypeComponentAuthFields} from "@/auth/model/auth.roles";
import {useAuthState} from "@/auth/data/auth.slice";

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = (
	{children, Component: {role}}
) => {

	const {user} = useAuthState()
	const router = useRouter()

	const Children = () => <>{children}</>

	if (checkRole(user?.role, role)) return <Children/>
	else {
		router.pathname !== '/auth' && router.replace('/401')
		return null
	}
}

export default CheckRole;