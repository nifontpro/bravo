import {FC} from 'react'
import MenuItem from "@/core/presenter/Layout/Navigation/MenuContainer/MenuItem";
import LogoutButton from "@/core/presenter/Layout/Navigation/MenuContainer/auth/LogoutButton";
import {useAuthState} from "@/auth/data/auth.slice";

const AuthItems: FC = () => {
	const {user} = useAuthState()
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
