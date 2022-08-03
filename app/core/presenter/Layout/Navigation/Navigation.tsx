import { FC } from 'react'

import Logo from '@/core/presenter/Layout/Navigation/Logo'
import MenuContainer from '@/core/presenter/Layout/Navigation/MenuContainer/MenuContainer'
import styles from '@/core/presenter/Layout/Navigation/Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
