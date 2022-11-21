
import Users from "@/user/presenter/Users";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";

const User = () => {
	return <AuthComponent minRole={"director"}>
		<Users/>
	</AuthComponent>
};

export default User;