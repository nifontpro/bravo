import React, {FC, useEffect, useState} from 'react'
import Button from "@/core/presenter/ui/form/Button";
import {useAuthState} from "@/auth/data/auth.slice";
// https://stackoverflow.com/questions/68263036/using-websockets-with-next-js

const Chat: FC = () => {

	const {ws} = useAuthState()

	useEffect(() => {
		if (ws != null) {

			ws.onmessage = (event) => {
				console.log(event.data)
			}
		}
	}, [ws])

	const [text, setText] = useState("")

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setText(value)
	}

	return <div>
		<input type="text" value={text} onChange={inputHandler} placeholder="message"/>
		<Button onClick={() => {
			ws?.send(text)
			setText("")
		}
		}>
			Отправить сообщение
		</Button>
	</div>
}

export default Chat