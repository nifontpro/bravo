import {FC} from 'react'
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import AdminDepartmentList from "@/department/presenter/admin/AdminDepartmentList";
import {useCompanyState} from "@/company/data/company.slice";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {

	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"admin"}>
		<AdminMetaNavigation title="Отделы">
			{currentCompany ?
				<AdminDepartmentList company={currentCompany}/>
				:
				<div className="text-2xl">
					Выберите компанию, список отделов которой должен быть отображен
				</div>
			}
		</AdminMetaNavigation>
	</AuthComponent>
}

export default Index