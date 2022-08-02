import {FC} from 'react'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import {IMenu} from './menu.interface'
import dynamic from "next/dynamic";
import {userMenuTitle} from "@/components/layout/Navigation/MenuContainer/menu.data";

const DynamicAuthItems = dynamic(() => import ('./auth/AuthItems'), {ssr: false})

const Menu: FC<{ menu: IMenu }> = ({menu: {items, title}}) => {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{title}</div>
			<ul className={styles.ul}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link}/>
				))}
				{title === userMenuTitle ? <DynamicAuthItems/> : null}
			</ul>
		</div>
	)
}

export default Menu
