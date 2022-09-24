import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import Chat2 from "@/user/presenter/Chat2";

const ChatPage: NextPage = () => {

	return <AuthComponent minRole={"user"}>
		<Chat2/>
	</AuthComponent>
}

export default ChatPage