import {FC} from 'react'

import styles from '@/core/presenter/Layout/Sidebar/Sidebar.module.scss'
import {useAuthState} from "@/auth/data/auth.slice";
import {useCompanyState} from "@/company/data/company.slice";
import {useDepartmentState} from "@/department/data/department.slice";
import SidebarItem from "@/core/presenter/Layout/Sidebar/SidebarItem";

const Sidebar: FC = () => {

	const {user} = useAuthState()
	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()

	return <div className={styles.sidebar}>
		{user && <SidebarItem
			classname="rounded-full"
			imageUrl={user.imageUrl}
			text={user.name}
		/>}

		{currentCompany && <SidebarItem
			imageUrl={currentCompany.imageUrl}
			text={currentCompany.name}
		/>}

		{currentDepartment && <SidebarItem
			imageUrl={currentDepartment.imageUrl}
			text={currentDepartment.name}
		/>}
	</div>
}

export default Sidebar
