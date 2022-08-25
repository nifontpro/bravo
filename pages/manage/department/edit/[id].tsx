import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import DepartmentEdit from "@/department/presenter/admin/edit/DepartmentEdit";

const DepartmentEditPage: NextPage = () => {
	return <AuthComponent minRole={"admin"}>
		<DepartmentEdit/>
	</AuthComponent>
}

export default DepartmentEditPage