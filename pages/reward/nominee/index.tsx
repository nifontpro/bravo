import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import NomineeUser from "../../../app/reward/presenter/nominee/NomineeUser";

const Index: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<NomineeUser/>
	</AuthComponent>
};

export default Index