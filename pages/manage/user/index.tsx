import {FC} from 'react'
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import AdminUserList from "@/user/presenter/admin/AdminUserList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {
	return <AuthComponent minRole={"director"}>
		<AdminMetaNavigation title="Сотрудники">
			<AdminUserList/>
		</AdminMetaNavigation>
	</AuthComponent>
}

export default Index;