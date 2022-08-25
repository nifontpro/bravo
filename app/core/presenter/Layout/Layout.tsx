import {FC, PropsWithChildren} from 'react'

import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.layout}>
			<Navigation/>
			<div className={styles.center}>{children}</div>
			<AuthComponent minRole="user">
				<Sidebar/>
			</AuthComponent>
		</div>
	)
}

export default Layout
