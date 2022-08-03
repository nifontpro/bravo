import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse, IUser} from "@/auth/model/auth.types";
import {removeTokenStorage, saveToStorage} from "@/auth/data/auth.helper";

export interface IAuthInitialState {
	user: IUser | null
	accessToken: string
}

const initialState: IAuthInitialState = {
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
			saveToStorage(action.payload)
		},
		logout: (state) => {
			state.user = null
			state.accessToken = ''
			removeTokenStorage()
		}
	}
})

export const authActions = authSlice.actions