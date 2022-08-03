import {FC} from 'react'

import Menu from '@/core/presenter/Layout/Navigation/MenuContainer/Menu'
import {firstMenu, firstMenuAdmin, firstMenuDirector, firstMenuOwner, userMenu} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.data'
import {useAuth} from "@/auth/data/useAuth";
import {IMenu} from "@/core/presenter/Layout/Navigation/MenuContainer/menu.interface";

const MenuContainer: FC = () => {

	const {user} = useAuth()

	let menu: IMenu = firstMenu

	switch (user?.role) {
		case "owner": {
			menu = firstMenuOwner
			break
		}
		case "admin": {
			menu = firstMenuAdmin
			break
		}
		case "director": {
			menu = firstMenuDirector
			break
		}
	}

	return (
		<div>
			<Menu menu={menu}/>
			<Menu menu={userMenu}/>
		</div>
	)
}

export default MenuContainer
