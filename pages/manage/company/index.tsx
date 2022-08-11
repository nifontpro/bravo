import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import CompanyList from "@/company/presenter/admin/CompanyList";

const Index: FC = () => {
	return <AuthVerify minRole={"owner"}>
		<CompanyList/>
	</AuthVerify>
}

export default Index;