import {NextPage} from "next";
import Auth from "@/auth/presenter/Auth";

const LoginPage: NextPage = () => {
	return (
		<Auth/>
	);
};

export default LoginPage;