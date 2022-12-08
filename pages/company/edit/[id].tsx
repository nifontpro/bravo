import {NextPage} from "next";
import CompanyEdit from "@/company/presenter/admin/edit/CompanyEdit";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const CompanyEditPage: NextPage = () => {
	return <AuthComponent minRole={"owner"}>
		<CompanyEdit/>
	</AuthComponent>
}

export default CompanyEditPage