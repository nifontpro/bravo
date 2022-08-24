import {FC} from 'react'
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";
import {useUserAdmin} from "@/user/presenter/admin/useUserAdmin";
import {useRouter} from "next/router";

const DepartmentList: FC = () => {
	const {tableUsers, isLoading, handleSearch, searchTerm, deleteAsync} = useUserAdmin()
	const {push} = useRouter()

	const createAsync = async () => {
		await push('/manage/user/create')
	}

	return <div>
		<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
		<AdminTable
			tableItems={tableUsers}
			headerItems={['Фамилия', 'Имя Отчество', 'Роль']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	</div>
}

export default DepartmentList