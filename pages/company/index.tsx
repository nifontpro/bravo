import OwnerCompany from "@/company/presenter/OwnerCompany";
import {NextPageAuth} from "@/auth/model/auth.roles";

const CompaniesPage: NextPageAuth = () => {

	return (
		<OwnerCompany/>
	);
};

CompaniesPage.role = "owner"

export default CompaniesPage