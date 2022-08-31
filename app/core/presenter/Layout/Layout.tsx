import {FC, PropsWithChildren} from 'react'
import styles from '@/core/presenter/Layout/Layout.module.scss'
import Navigation from '@/core/presenter/Layout/Navigation/Navigation'
import Sidebar from "@/core/presenter/Layout/Sidebar/Sidebar";
import {useAuthState} from "@/auth/data/auth.slice";
import cn from 'classnames'
import MyModal from "@/core/presenter/Layout/MyModal";
import {useDispatch} from "react-redux";
import {modalActions, useModalState} from "@/core/store/modal.slice";
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";

const Layout: FC<PropsWithChildren> = ({children}) => {

	const {user} = useAuthState()
	const {isOpen} = useModalState()

	const dispatch = useDispatch()
	const handleClick = (state: boolean) => {
		dispatch(modalActions.setState(state))
	}

	return (
		<div className={styles.layout}>

			<Navigation/>

			{/*---------------------------------------------------------*/}
			<div className={cn(styles.center, {[styles.auth]: user})}>

				{/* До размера md */}
				<div className="my:hidden">
					<div className="flex-col">

						<div
							className='mx-1 h-14 z-10 bg-opacity-60 bg-cyan-100 hover:bg-opacity-90 transition-colors fixed shadow-lg rounded-xl'>
							<MaterialIcon onClick={() => handleClick(true)} name="MdMenu" classname="w-10 h-10 m-3"/>
						</div>

						{isOpen &&
							<MyModal>
								<MaterialIcon name="MdClose" classname="w-10 h-10 m-3" onClick={() => handleClick(false)}/>
								<Navigation/>
							</MyModal>
						}

						<div className={cn({["blur-sm"]: isOpen})}>
							{children}
						</div>
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