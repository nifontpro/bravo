import React, {FC, useEffect, useState} from 'react'
import useWebSocket from "react-use-websocket";
import Button from "@/core/presenter/ui/form/Button";
import {getAccessCookie} from "@/auth/data/auth.helper";

let x = 0

const Chat: FC = () => {

	const socketUrl = 'ws://localhost:8080/chat'
	const token = getAccessCookie()

	const {
		sendMessage,
		sendJsonMessage,
		lastMessage,
		lastJsonMessage,
		readyState,
		getWebSocket,
	} = useWebSocket(socketUrl, {
		onOpen: () => {
			console.log(`Client ${x++}: send token...`)
			sendMessage(token || '-')
		},
		//Will attempt to reconnect on all close events, such as server shutting down
		shouldReconnect: () => true,
		share: false
	})

	const [text, setText] = useState("")

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setText(value)
	}

	useEffect(() => {
		console.log(lastMessage?.data)
	}, [lastMessage])

	useEffect(() => {
	}, [])

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