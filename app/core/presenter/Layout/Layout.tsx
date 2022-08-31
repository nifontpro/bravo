import {FC, PropsWithChildren} from 'react'
import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import {useAuthState} from "@/auth/data/auth.slice";
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";
import Link from "next/link";
import {useRouter} from "next/router";
import cn from 'classnames'

const Layout: FC<PropsWithChildren> = ({children}) => {

	const {user} = useAuthState()
	const {asPath} = useRouter()
	const isnMenu = asPath != '/menu'

	return (
		<div className={styles.layout}>

			<Navigation/>

			{/*---------------------------------------------------------*/}
			<div className={cn(styles.center, {[styles.auth]: user})}>

				{/* До размера md */}
				<div className="my:hidden">
					<div className="flex-col">
						{isnMenu && <Link href="/menu">
							<a>
								<MaterialIcon name="MdMenu" classname="w-10 h-10 m-3"/>
							</a>
						</Link>}
						{children}
					</div>
				</div>

				{/* После размера md */}
				<div className="hidden my:flex my:flex-col">
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