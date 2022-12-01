import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import {useCompanyState} from "@/company/data/company.slice";
import Medals from "../../app/medal/presenter/Medals";
import Awards from 'award/presenter/Awards';

const MedalsPage: NextPage = () => {

	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"director"}>
		{currentCompany ? <Awards company={currentCompany}/>
			:
			<div className="@apply text-2xl">
				Для просмотра списка наград сначала выберите компанию
			</div>
		}
	</AuthComponent>

}

export default MedalsPage;