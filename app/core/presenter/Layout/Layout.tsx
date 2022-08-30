import {FC, PropsWithChildren, useState} from 'react'

import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import {useAuthState} from "@/auth/data/auth.slice";
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";

const Layout: FC<PropsWithChildren> = ({children}) => {

	const {user} = useAuthState()

	const [nav, setNav] = useState(false)
	const handleClick = () => {
		setNav(!nav)
	}

	return (
		<div className={styles.layout}>
			<Navigation className="hidden sm:flex-col"/>
			<div className={styles.center}>

				<div className="lg:hidden" onClick={handleClick}>
					{nav ?
						<div className="flex-col">
							<MaterialIcon name="MdClose" classname="w-10 h-10"/>
							<Navigation/>
						</div>
						:
						<MaterialIcon name="MdMenu" classname="w-10 h-10"/>}
				</div>

				{children}
			</div>
			{user ?
				<Sidebar/>
				:
				null
			}
		</div>
	)
}

export default Layout;