import {NextPage} from "next";
import Users from "@/user/presenter/Users";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const DepartmentsPage: NextPage = () => {
	return <AuthPage minRole={"director"}>
		<Users/>
	</AuthPage>
};

export default DepartmentsPage;