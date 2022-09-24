import React, {FC, useEffect, useRef, useState} from 'react'
import Button from "@/core/presenter/ui/form/Button";
import {getAccessCookie} from "@/auth/data/auth.helper";
import {API_SERVER_URL} from "@/core/config/api.config";

let x = 0

const Chat: FC = () => {
	const socketUrl = `ws://85.237.34.95:8080/chat`
	const token = getAccessCookie()
	const ws = useRef<WebSocket>()

	useEffect(() => {
		ws.current = new WebSocket(socketUrl)

		ws.current.onopen = (event) => {
			console.log(`Client ${x++}: send token...`)
			ws.current?.send(token || '-')
		}

		ws.current.onmessage = (event) => {
			console.log(event.data)
		}
	}, [])

	const [text, setText] = useState("")

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setText(value)
	}

	return <div>
		<input type="text" value={text} onChange={inputHandler} placeholder="message"/>
		<Button onClick={() => {
			ws.current?.send(text)
			setText("")
		}
		}>
			Отправить сообщение
		</Button>
	</div>
}

export default Chat