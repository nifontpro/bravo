import {NextPage} from "next";
import Users from "@/user/presenter/Users";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const DepartmentsPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<Users/>
	</AuthComponent>
};

export default DepartmentsPage;