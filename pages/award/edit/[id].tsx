import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import AwardEdit from 'award/presenter/admin/edit/AwardEdit';

const CompanyEditPage: NextPage = () => {
	return <AuthComponent minRole={"owner"}>
		<AwardEdit/>
	</AuthComponent>
}

export default CompanyEditPage