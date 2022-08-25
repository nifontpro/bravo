import OwnerCompany from "@/company/presenter/OwnerCompany";
import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const CompaniesPage: NextPage = () => {

	return <AuthComponent minRole={"owner"}>
		<OwnerCompany/>
	</AuthComponent>
}

export default CompaniesPage