import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import DepartmentList from "@/department/presenter/admin/DepartmentList";

const Index: FC = () => {
	return <AuthVerify minRole={"admin"}>
		<DepartmentList/>
	</AuthVerify>
}

export default Index;