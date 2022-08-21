import {FC} from 'react'
import {useCompanyAdmin} from "@/company/presenter/admin/useCompanyAdmin";
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";

const AdminCompanyList: FC = () => {

	const {companies, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} = useCompanyAdmin()

	return (
		<Meta title="Компании">
			<AdminNavigation/>
			<Heading title="Компании"/>
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				tableItems={companies || []}
				headerItems={['Название', 'Информация', 'Рейтинг']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default AdminCompanyList