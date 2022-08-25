import {FC, MouseEvent} from 'react'
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";
import {authActions} from "@/auth/data/auth.slice";
import {useDispatch} from "react-redux";
import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";
import {userApi} from "@/user/data/user.api";
import {companyActions} from "@/company/data/company.slice";
import {departmentActions} from "@/department/data/department.slice";

const LogoutButton: FC = () => {

	const dispatch = useDispatch()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		dispatch(authActions.logout())
		dispatch(companyActions.clear())
		dispatch(departmentActions.clear())
		dispatch(companyApi.util.resetApiState())
		dispatch(departmentApi.util.resetApiState())
		dispatch(userApi.util.resetApiState())
		// dispatch(userApi.util.invalidateTags(['User']))
	}

	return <li>
		<a onClick={handleLogout}>
			<MaterialIcon name="MdLogout"/>
			<span>Выйти</span>
		</a>
	</li>
}

export default LogoutButton
