import {FC} from 'react'
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import {useCompanyState} from "@/company/data/company.slice";
import AdminMedalList from "@/medal/presenter/admin/AdminMedalList";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {

	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"director"}>
		<AdminMetaNavigation title="Награды">
			{currentCompany ?
				<AdminMedalList company={currentCompany}/>
				:
				<div className="text-2xl">
					Выберите компанию, список наград которой должен быть отображен
				</div>
			}
		</AdminMetaNavigation>
	</AuthComponent>

}

export default Index;