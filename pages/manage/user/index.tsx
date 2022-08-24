import {FC} from 'react'
import AuthVerify from "@/core/providers/AuthProvider/AuthPage";
import AdminUserList from "@/user/presenter/admin/AdminUserList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {
	return <AuthVerify minRole={"director"}>
		<AdminMetaNavigation title="Сотрудники">
			<AdminUserList/>
		</AdminMetaNavigation>
	</AuthVerify>
}

export default Index;