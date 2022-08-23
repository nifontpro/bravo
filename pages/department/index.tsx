import Departments from "@/department/presenter/Departments";
import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import {useCompanyState} from "@/company/data/company.slice";

const DepartmentsPage: NextPage = () => {

	const {currentCompany} = useCompanyState()

	return currentCompany ? <AuthPage minRole={"admin"}>
			<Departments company={currentCompany}/>
		</AuthPage> :
		<div className="@apply text-2xl">
			Выберите компанию, список отделов которой должен быть отображен
		</div>
}

export default DepartmentsPage;