import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import {useCompanyState} from "@/company/data/company.slice";
import Awards from 'award/presenter/Awards';

const AwardsPage: NextPage = () => {

	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"user"}>
		{currentCompany ? <Awards company={currentCompany}/>
			:
			<div className="@apply text-2xl">
				Для просмотра списка наград сначала выберите компанию
			</div>
		}
	</AuthComponent>

}

export default AwardsPage;