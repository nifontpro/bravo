import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import AdminCompanyList from "@/company/presenter/admin/AdminCompanyList";

const Index: FC = () => {
	return <AuthVerify minRole={"owner"}>
		<AdminCompanyList/>
	</AuthVerify>
}

export default Index;