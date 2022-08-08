import OwnerCompany from "@/company/presenter/OwnerCompany";
import {NextPage} from "next";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const CompaniesPage: NextPage = () => {

	return <AuthPage minRole={"owner"}>
		<OwnerCompany/>
	</AuthPage>
}

export default CompaniesPage