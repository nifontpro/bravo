import {FC} from 'react'
import {useAuth} from "@/hooks/useAuth";
import MenuItem from "@/components/layout/Navigation/MenuContainer/MenuItem";
import LogoutButton from "@/components/layout/Navigation/MenuContainer/auth/LogoutButton";

const AuthItems: FC = () => {
	const {user} = useAuth()
	return <>
		{user ? (<>
			<MenuItem item={{icon: 'MdSettings', link: '/profile', title: 'Профиль'}}/>
			<LogoutButton/>
		</>) : (
			<MenuItem item={{icon: 'MdLogin', link: '/auth', title: 'Войти'}}/>
		)}

{/*		{user?.isAdmin && (<MenuItem
			item={{icon: 'MdOutlineLock', link: getAdminHomeUrl(), title: 'Admin panel'}}
		/>)}*/}
	</>
}

export default AuthItems
