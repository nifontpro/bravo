import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import UserCreate from "@/user/presenter/admin/create/UserCreate";

const DepartmentsPage: NextPage = () => {
	return <AuthPage minRole={"director"}>
		<UserCreate/>
	</AuthPage>
};

export default DepartmentsPage;