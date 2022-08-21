import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import AdminDepartmentList from "@/department/presenter/admin/AdminDepartmentList";

const Index: FC = () => {
	return <AuthVerify minRole={"admin"}>
		<AdminDepartmentList/>
	</AuthVerify>
}

export default Index;