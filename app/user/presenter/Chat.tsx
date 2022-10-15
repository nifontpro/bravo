import React, {FC, useState} from 'react'
import Button from "@/core/presenter/ui/form/Button";
import {useWebSocket} from "@/user/presenter/useWebSocket";
// https://stackoverflow.com/questions/68263036/using-websockets-with-next-js

const Chat: FC = () => {

	const {sendMessage} = useWebSocket()

	const [text, setText] = useState("")

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setText(value)
	}

	return <div>
		<input type="text" value={text} onChange={inputHandler} placeholder="message"/>
		<Button onClick={() => {
			sendMessage(text)
			setText("")
		}
		}>
			Отправить сообщение
		</Button>
	</div>
}

export default Chat