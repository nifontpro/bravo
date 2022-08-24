import {FC} from 'react'
import {useCompanyAdmin} from "@/company/presenter/admin/useCompanyAdmin";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";

const AdminCompanyList: FC = () => {

	const {companies, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} = useCompanyAdmin()

	return <div>
		<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
		<AdminTable
			tableItems={companies || []}
			headerItems={['Название', 'Информация', 'Рейтинг']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	</div>
}

export default AdminCompanyList