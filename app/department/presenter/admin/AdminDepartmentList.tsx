import {FC} from 'react'
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";
import {useDepartmentAdmin} from "@/department/presenter/admin/useDepartmentAdmin";
import {ICompany} from "@/company/model/company.types";

const AdminDepartmentList: FC<{ company: ICompany }> = ({company}) => {

	const {departments, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} =
		useDepartmentAdmin(company.id)

	return (
		<Meta title="Отделы">
			<AdminNavigation/>
			<Heading title="Отделы"/>
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				tableItems={departments || []}
				headerItems={['Название', 'Описание', 'Id']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default AdminDepartmentList