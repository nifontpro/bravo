import {FC} from 'react'
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";
import {useDepartmentAdmin} from "@/department/presenter/admin/useDepartmentAdmin";
import {useCompanyState} from "@/company/data/company.slice";

const AdminDepartmentList: FC = () => {

	const {currentCompany} = useCompanyState()

	const {departments, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} =
		useDepartmentAdmin(currentCompany?.id)

	return (
		<Meta title="Отделы">
			<AdminNavigation/>
			<Heading title="Отделы"/>
			{currentCompany ? <>
					<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
					<AdminTable
						tableItems={departments || []}
						headerItems={['Название', 'Описание', 'Id']}
						isLoading={isLoading}
						removeHandler={deleteAsync}
					/>
				</>
				:
				<div className="@apply text-2xl">
					Выберите компанию, список отделов которой должен быть отображен
				</div>
			}
		</Meta>
	)
}

export default AdminDepartmentList