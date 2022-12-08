import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import AwardCreate from 'award/presenter/admin/create/AwardCreate';

const AwardsPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<AwardCreate/>
	</AuthComponent>
};

export default AwardsPage;