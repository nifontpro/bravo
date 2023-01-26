import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse} from "@/auth/model/auth.types";
import {removeLocalData, saveTokensToCookie} from "@/auth/data/auth.helper";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {IUser} from "@/user/model/user.types";
import { TypeRootState } from '@/core/data/store';

interface IAuthState {
	user?: IUser
	ws?: WebSocket
	isLoading?: boolean | undefined
}

const initialState: IAuthState = {
	ws: undefined,
	isLoading: undefined
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user
			saveTokensToCookie(action.payload)
		},
		setLoading: (state, action: PayloadAction<boolean | undefined>) => {
			state.isLoading = action.payload
			console.log(`Загрузка пользователя ${state.isLoading}`)
		},
		// setWs: (state) => {
		// 	if (isBrowser) {
		// 		state.ws = new WebSocket(SOCKET_URL)
		// 	}
		// },
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
export const useAuthState = () => useTypedSelector((state: TypeRootState) => state.auth)
export const useAuthLoading = () => useTypedSelector((state: TypeRootState) => state.auth.isLoading)