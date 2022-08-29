import {FC} from 'react'

import styles from '@/core/presenter/Layout/Sidebar/Sidebar.module.scss'
import {useAuthState} from "@/auth/data/auth.slice";
import {useCompanyState} from "@/company/data/company.slice";
import {useDepartmentState} from "@/department/data/department.slice";
import SidebarItem from "@/core/presenter/Layout/Sidebar/SidebarItem";
import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";

const Sidebar: FC = () => {

	const {user} = useAuthState()
	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()

	const sc = currentCompany?.id == undefined
	const {data: company} = companyApi.useGetByIdQuery(currentCompany?.id || '', {skip: sc})

	const sd = currentDepartment?.id == undefined
	const {data: department} = departmentApi.useGetByIdQuery(currentDepartment?.id || '', {skip: sd})

	return <div className={styles.sidebar}>
		{user && <SidebarItem
			imageUrl={user.imageUrl}
			text={user.name}
		/>}

		{currentCompany && <SidebarItem
			imageUrl={company?.imageUrl}
			text={currentCompany.name}
		/>}

		{currentDepartment && <SidebarItem
			imageUrl={department?.imageUrl}
			text={currentDepartment.name}
		/>}
	</div>
}

export default Sidebar
