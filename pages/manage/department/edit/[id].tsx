import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import DepartmentEdit from "@/department/presenter/admin/edit/DepartmentEdit";

const DepartmentEditPage: NextPage = () => {
	return <AuthPage minRole={"admin"}>
		<DepartmentEdit/>
	</AuthPage>
}

export default DepartmentEditPage