import {FC} from 'react'

import styles from '@/core/presenter/Layout/Sidebar/Sidebar.module.scss'
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";
import {useAuthState} from "@/auth/data/auth.slice";
import {useCompanyState} from "@/company/data/company.slice";
import {useDepartmentState} from "@/department/data/department.slice";

const Sidebar: FC = () => {

	const {user} = useAuthState()
	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()

	return <div className={styles.sidebar}>
		{user && <div>
			<ImageDefault
				className="@apply rounded-full w-full mx-auto"
				src={user?.imageUrl}
				alt={user?.name}
				layout="intrinsic"
				width={150}
				height={150}
				draggable={false}
				objectFit="cover"
			/>
			<h2 className="@apply text-2xl py-3">{user.name}</h2>
		</div>}

		{currentCompany && <div>
			<ImageDefault
				src={currentCompany?.imageUrl}
				alt={currentCompany?.name}
				layout="fixed"
				width={150}
				height={150}
				draggable={false}
				objectFit="cover"
			/>
			<h2 className="text-2xl py-3">{currentCompany.name}</h2>
		</div>}

		{currentDepartment && <div>
			<ImageDefault
				src={currentDepartment?.imageUrl}
				alt={currentDepartment?.name}
				layout="fixed"
				width={150}
				height={150}
				draggable={false}
				objectFit="cover"
			/>
			<h2 className="text-2xl py-3">{currentDepartment.name}</h2>
		</div>}

	</div>
}

export default Sidebar
