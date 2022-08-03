import {FC, MouseEvent} from 'react'
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";
import {authActions} from "@/auth/data/auth.slice";
import {useDispatch} from "react-redux";

const LogoutButton: FC = () => {

	const dispatch = useDispatch()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		dispatch(authActions.logout())
	}

	return <li>
		<a onClick={handleLogout}>
			<MaterialIcon name="MdLogout"/>
			<span>Выйти</span>
		</a>
	</li>
}

export default LogoutButton
