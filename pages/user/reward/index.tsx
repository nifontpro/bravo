import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import RewardUser from "@/user/presenter/reward/RewardUser";

const Index: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<RewardUser/>
	</AuthComponent>
};

export default Index