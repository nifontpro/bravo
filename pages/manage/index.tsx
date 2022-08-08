import {NextPage} from "next";
import Admin from "../../app/admin/presenter/home/Admin";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const AdminPage: NextPage = () => {
	return <AuthPage minRole={"director"}>
		<Admin/>
	</AuthPage>
}

export default AdminPage;