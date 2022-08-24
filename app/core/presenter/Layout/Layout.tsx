import {FC, PropsWithChildren} from 'react'

import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.layout}>
			<Navigation/>
			<div className={styles.center}>{children}</div>
			<AuthPage minRole="user">
				<Sidebar/>
			</AuthPage>
		</div>
	)
}

export default Layout
