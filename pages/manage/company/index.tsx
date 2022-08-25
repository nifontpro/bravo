import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthComponent";
import AdminCompanyList from "@/company/presenter/admin/AdminCompanyList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {
	return <AuthVerify minRole={"owner"}>
		<AdminMetaNavigation title="Компании">
			<AdminCompanyList/>
		</AdminMetaNavigation>
	</AuthVerify>
}

export default Index;