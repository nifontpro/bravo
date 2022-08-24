import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import {useCompanyState} from "@/company/data/company.slice";
import Medals from "../../app/medal/presenter/Medals";

const MedalsPage: NextPage = () => {

	const {currentCompany} = useCompanyState()

	return currentCompany ? <AuthPage minRole={"admin"}>
			<Medals company={currentCompany}/>
		</AuthPage> :
		<div className="@apply text-2xl">
			Для просмотра медалей сначала выберите компанию
		</div>
}

export default MedalsPage;