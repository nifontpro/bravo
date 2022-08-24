import {FC} from 'react'
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";
import {ICompany} from "@/company/model/company.types";
import {useMedalAdmin} from "@/medal/presenter/admin/useMedalAdmin";

const AdminMedalList: FC<{ company: ICompany }> = ({company}) => {

	const {medals, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} =
		useMedalAdmin(company.id)

	return <div>
		<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
		<AdminTable
			tableItems={medals || []}
			headerItems={['Название', 'Рейтинг', 'Id']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	</div>
}

export default AdminMedalList