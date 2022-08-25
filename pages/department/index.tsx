import Departments from "@/department/presenter/Departments";
import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import {useCompanyState} from "@/company/data/company.slice";

const DepartmentsPage: NextPage = () => {

	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"admin"}>
		{currentCompany ?
			<Departments company={currentCompany}/>
			:
			<div className="@apply text-2xl">
				Выберите компанию, список отделов которой должен быть отображен
			</div>
		}
	</AuthComponent>
}

export default DepartmentsPage;