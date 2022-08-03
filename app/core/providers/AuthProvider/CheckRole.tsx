import {FC, PropsWithChildren} from 'react';
import {useAuth} from "@/auth/data/useAuth";
import {useRouter} from "next/router";
import {TypeComponentAuthFields} from "@/auth/model/auth.roles";

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = (
	{children, Component: {role}}
) => {

	const {user} = useAuth()

	const router = useRouter()

	const Children = () => <>{children}</>

	if ((user && user.role === role) || !role) return <Children/>
	else {
		router.pathname !== '/auth' && router.replace('/auth')
		return null
	}
}

export default CheckRole;