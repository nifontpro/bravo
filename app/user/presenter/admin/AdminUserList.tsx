import {FC} from 'react'
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
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

	return (
		<Meta title="Сотрудники">
			<AdminNavigation/>
			<Heading title="Сотрудники"/>
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				tableItems={tableUsers}
				headerItems={['Фамилия', 'Имя Отчество', 'Роль']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default DepartmentList