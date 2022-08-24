import {FC} from 'react'
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import {useCompanyState} from "@/company/data/company.slice";
import AdminMedalList from "@/medal/presenter/admin/AdminMedalList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {

	const {currentCompany} = useCompanyState()

	return <AuthPage minRole={"director"}>
		<AdminMetaNavigation title="Награды">
			{currentCompany ?
				<AdminMedalList company={currentCompany}/>
				:
				<div className="text-2xl">
					Выберите компанию, список наград которой должен быть отображен
				</div>
			}
		</AdminMetaNavigation>
	</AuthPage>

}

export default Index;