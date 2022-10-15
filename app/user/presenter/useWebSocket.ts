import {useAuthState} from "@/auth/data/auth.slice";
import {useEffect, useMemo} from "react";
import {getAccessTokenFromCookie} from "@/auth/data/auth.helper";

// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
export const useWebSocket = () => {
	const {ws} = useAuthState()

	useEffect(() => {
		if (ws) {

			ws.onmessage = (event) => {
				console.log(event.data)
			}

			/**
			 * Для открытия защищенного канала первым сообщением передаем токен
			 */
			ws.onopen = () => {
				const token = getAccessTokenFromCookie()
				ws.send(token || '')
			}
		}
	}, [ws])

	return useMemo(() => {

		const sendMessage = (message: string) => {
			if (ws?.readyState == 1) {
				ws?.send(message)
			}
		}
		return {sendMessage}
	}, [ws])

}