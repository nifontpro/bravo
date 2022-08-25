import {FC, PropsWithChildren} from 'react'

import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import {useAuthState} from "@/auth/data/auth.slice";

const Layout: FC<PropsWithChildren> = ({children}) => {

	const {user} = useAuthState()

	return (
		<div className={styles.layout}>
			<Navigation/>
			<div className={styles.center}>{children}</div>
			{user ?
				< Sidebar/>
				:
				<div className="text-2xl py-5 items-center">Добро пожаловать!</div>
			}
		</div>
	)
}

export default Layout;