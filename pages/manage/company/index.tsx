import {FC} from 'react'
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import AdminCompanyList from "@/company/presenter/admin/AdminCompanyList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {
	return <AuthComponent minRole={"owner"}>
		<AdminMetaNavigation title="Компании">
			<AdminCompanyList/>
		</AdminMetaNavigation>
	</AuthComponent>
}

export default Index;