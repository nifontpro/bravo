import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse} from "@/auth/model/auth.types";
import {removeLocalData, saveTokensToCookie} from "@/auth/data/auth.helper";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {IUser} from "@/user/model/user.types";

interface IAuthState {
	user: IUser | null
}

const initialState: IAuthState = {
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user
			saveTokensToCookie(action.payload)
		},
		logout: (state) => {
			state.user = null
			removeLocalData()
		}
	}
})

export const authActions = authSlice.actions

export const useAuthState = () => useTypedSelector((state) => state.auth)