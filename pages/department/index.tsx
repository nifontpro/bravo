import Departments from "@/department/presenter/Departments";
import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const DepartmentsPage: NextPage = () => {

	return <AuthPage minRole={"admin"}>
		<Departments/>
	</AuthPage>
}

export default DepartmentsPage;