import {FC} from 'react'
import styles from '@/core/presenter/Layout/Navigation/MenuContainer/Menu.module.scss'
import MenuItem from '@/core/presenter/Layout/Navigation/MenuContainer/MenuItem'
import {IMenu} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface'
import dynamic from "next/dynamic";
import {userMenuTitle} from "@/core/presenter/Layout/Navigation/MenuContainer/menu.data";

const DynamicAuthItems = dynamic(() => import ('@/core/presenter/Layout/Navigation/MenuContainer/auth/AuthItems'), {ssr: false})

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
