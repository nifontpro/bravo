import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthInitialState} from "./auth.inteface";
import {checkAuth, login, logout, register} from "./auth.actions";
import {IAuthResponse} from "@/services/auth/auth.types";

const initialState: IAuthInitialState = {
	isLoading: false,
	user: null, //getStoreLocal('user')
	accessToken: ''
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthState: (state, action: PayloadAction<IAuthResponse>) => {
			state.accessToken = action.payload.accessToken
			state.user = action.payload.user
		},
		setLogout: (state) => {
			state.isLoading = false
			state.user = null
			state.accessToken = ''
		}
	},
	extraReducers: (builder) => {
		/*		[register.pending.type]: (state) => {
					state.isLoading = true
				},*/
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, {payload}) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, {payload}) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
			.addCase(checkAuth.fulfilled, (state, {payload}) => {
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
	}
})

export default authSlice.reducer

export const {setAuthState, setLogout} = authSlice.actions