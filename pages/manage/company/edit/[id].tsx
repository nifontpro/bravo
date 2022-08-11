import {NextPage} from "next";
import CompanyEdit from "@/company/presenter/admin/edit/CompanyEdit";
import AuthPage from "@/core/providers/AuthProvider/AuthPage";

const CompanyEditPage: NextPage = () => {
	return <AuthPage minRole={"owner"}>
		<CompanyEdit/>
	</AuthPage>
}

export default CompanyEditPage