import {FC, PropsWithChildren} from 'react';
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {TypeComponentAuthFields} from "../../model/auth.types";

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