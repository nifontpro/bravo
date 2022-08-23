import {FC} from 'react'
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import AdminDepartmentList from "@/department/presenter/admin/AdminDepartmentList";
import {useCompanyState} from "@/company/data/company.slice";

const Index: FC = () => {

	const {currentCompany} = useCompanyState()

	return currentCompany ? <AuthPage minRole={"admin"}>
			<AdminDepartmentList company={currentCompany}/>
		</AuthPage> :
		<div className="@apply text-2xl">
			Выберите компанию, список отделов которой должен быть отображен
		</div>
}

export default Index;