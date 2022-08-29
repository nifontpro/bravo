import {FC} from 'react'
import MenuItem from "@/core/presenter/Layout/Navigation/MenuContainer/MenuItem";
import LogoutButton from "@/core/presenter/Layout/Navigation/MenuContainer/auth/LogoutButton";
import {useAuthState} from "@/auth/data/auth.slice";
import {getAdminHomeUrl} from "@/core/config/url.config";
import {checkRole} from "@/auth/model/auth.roles";

const AuthItems: FC = () => {
	const {user} = useAuthState()
	return <>
		{user ? (<>
			<MenuItem item={{icon: 'MdSettings', link: `/user/${user.id}`, title: 'Профиль'}}/>
			<LogoutButton/>
		</>) : (
			<MenuItem item={{icon: 'MdLogin', link: '/auth', title: 'Войти'}}/>
		)}

		{checkRole(user?.role, "director") && (<MenuItem
			item={{icon: 'MdOutlineLock', link: getAdminHomeUrl(), title: 'Администрирование'}}
		/>)}
	</>
}

export default AuthItems
