import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import UserEdit from "@/user/presenter/admin/edit/UserEdit";

const DepartmentEditPage: NextPage = () => {
	return <AuthPage minRole={"director"}>
		<UserEdit/>
	</AuthPage>
}

export default DepartmentEditPage