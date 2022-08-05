import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse} from "@/auth/model/auth.types";
import {removeRefreshCookie, saveRefreshToCookie} from "@/auth/data/auth.helper";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {IUser} from "@/user/model/user.types";

interface IAuthState {
	user: IUser | null
	accessToken: string
}

const initialState: IAuthState = {
	user: null,
	accessToken: ''
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IAuthResponse>) => {
			state.accessToken = action.payload.accessToken
			state.user = action.payload.user
			saveRefreshToCookie(action.payload)
		},
		logout: (state) => {
			state.user = null
			state.accessToken = ''
			removeRefreshCookie()
		}
	}
})

export const authActions = authSlice.actions

export const useAuthState = () => useTypedSelector((state) => state.auth)