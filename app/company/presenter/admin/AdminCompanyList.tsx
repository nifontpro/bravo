import {FC} from 'react'
import {useCompanyAdmin} from "@/company/presenter/admin/useCompanyAdmin";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";

const AdminCompanyList: FC = () => {

	const {companies, isLoading, handleSearch, searchTerm, deleteAsync} = useCompanyAdmin()

	return <div>
		<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
		<AdminTable
			tableItems={companies || []}
			headerItems={['Название', 'Информация', 'Id']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	</div>
}

export default AdminCompanyList