import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import UserCreate from "@/user/presenter/admin/create/UserCreate";

const DepartmentsPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<UserCreate/>
	</AuthComponent>
};

export default DepartmentsPage;