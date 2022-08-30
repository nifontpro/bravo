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

	/*	const [width, setWidth] = useState(window.innerWidth);
		const breakpoint = 1024;
		useEffect(() => {
			const handleResizeWindow = () => setWidth(window.innerWidth);
			// subscribe to window resize event "onComponentDidMount"
			window.addEventListener("resize", handleResizeWindow);
			return () => {
				// unsubscribe "onComponentDestroy"
				window.removeEventListener("resize", handleResizeWindow);
			};
		}, []);*/

	return (
		<div className={styles.layout}>

			<Navigation/>

			{/*---------------------------------------------------------*/}
			{/*Адаптивный средний элемент с меню*/}

			<div className={styles.center}>

				{/* До размера lg */}
				<div className="lg:hidden" onClick={handleClick}>
					{nav ?
						<div className="flex-col">
							<MaterialIcon name="MdClose" classname="w-10 h-10"/>
							<Navigation/>
						</div>
						:
						<div className="flex-col">
							<MaterialIcon name="MdMenu" classname="w-10 h-10"/>
							{children}
						</div>
					}
				</div>

				{/* После размера lg */}
				<div className="hidden lg:flex lg:flex-col">
					{children}
				</div>

			</div>

			{/*---------------------------------------------------------*/}

			{
				user ?
					<Sidebar/>
					:
					null
			}
		</div>
	)
}

export default Layout;