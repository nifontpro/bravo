import {FC} from 'react'
import {useCompany} from "@/company/presenter/admin/useCompany";
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";

const CompanyList: FC = () => {

	const {companies, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} = useCompany()

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

export default CompanyList