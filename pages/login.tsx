import {NextPage} from "next";
import LoginAuth from '@/auth/presenter/Login/Login';

const LoginPage: NextPage = () => {
	return (
		<LoginAuth/>
	);
};

export default LoginPage;