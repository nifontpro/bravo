import {NextPage} from "next";
import Admin from "../../app/admin/presenter/home/Admin";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const AdminPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<Admin/>
	</AuthComponent>
}

export default AdminPage;