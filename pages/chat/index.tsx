import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import Chat from "@/user/presenter/Chat";

const ChatPage: NextPage = () => {

	return <AuthComponent minRole={"user"}>
		<Chat/>
	</AuthComponent>
}

export default ChatPage