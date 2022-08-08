import {FC} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import cn from 'classnames'
import styles from './AdminNavigation.module.scss';
import {INavItem} from "./admin-navigation.types";

const AdminNavItem: FC<{ item: INavItem }> = ({item: {link, title}}) => {

	const {asPath} = useRouter()

	return <li>
		<Link href={link}>
			<a className={cn({[styles.active]: asPath === link})}>
				{title}
			</a>
		</Link>
	</li>
}

export default AdminNavItem