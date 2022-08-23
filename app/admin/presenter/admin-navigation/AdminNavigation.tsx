import {FC} from 'react';
import styles from './AdminNavigation.module.scss';
import {navItems} from "./admin-navigation.data";
import AdminNavItem from "./AdminNavItem";
import {useAuthState} from "@/auth/data/auth.slice";

const AdminNavigation: FC = () => {

	const {user} = useAuthState()

	return <nav className={styles.nav}>
		<ul>
			{navItems(user?.role).map(item => <AdminNavItem key={item.link} item={item}/>)}
		</ul>
	</nav>
}

export default AdminNavigation