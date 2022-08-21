import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import AdminUserList from "@/user/presenter/admin/AdminUserList";

const Index: FC = () => {
	return <AuthVerify minRole={"director"}>
		<AdminUserList/>
	</AuthVerify>
}

export default Index;