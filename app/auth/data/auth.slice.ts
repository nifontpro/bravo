import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse} from "@/auth/model/auth.types";
import {removeLocalData, saveTokensToCookie} from "@/auth/data/auth.helper";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {IUser} from "@/user/model/user.types";
import {SOCKET_URL} from "@/core/config/api.config";

interface IAuthState {
	user?: IUser
	ws?: WebSocket
}

const initialState: IAuthState = {
	ws: undefined
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user
			saveTokensToCookie(action.payload)
		},
		setWs: (state, action: PayloadAction<string>) => {
			if (isBrowser) {
				state.ws = new WebSocket(SOCKET_URL)
				if (state.ws && isBrowser) {
					state.ws.onopen = () => {
						console.log("WS Connected!")
						state.ws.send(action.payload)
					}
					/*ws.addEventListener('open', () => {
						console.log("WS Connected!")
						state.ws?.send(action.payload)
					})*/
				}
			}
		},
		logout: (state) => {
			state.user = undefined
			if (state.ws?.readyState != 3) {
				state.ws?.close()
			}
			removeLocalData()
		}
	}
})

export const isBrowser = typeof window !== "undefined"
export const authActions = authSlice.actions
export const useAuthState = () => useTypedSelector((state) => state.auth)