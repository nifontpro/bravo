import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import MedalEdit from "@/medal/presenter/admin/edit/MedalEdit";

const CompanyEditPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<MedalEdit/>
	</AuthComponent>
}

export default CompanyEditPage