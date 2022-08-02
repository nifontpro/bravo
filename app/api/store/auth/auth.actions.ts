import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "@/services/auth/auth.service";
import {toast} from "react-toastify";
import {toastError} from "@/utils/toast-error";
import {IEmailPassword} from "./auth.inteface";
import {errorCatch} from "../../api.helpers";
import {IAuthResponse} from "@/services/auth/auth.types";

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({email, password}, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password)
			toast.success('Registration successfully')
			return response.data
		} catch (error) {
			toastError(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({email, password}, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password)
			toast.success('Вход выполнен успешно')
			return response.data
		} catch (error) {
			toastError(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout',
	async () => {
		await AuthService.logout()
	}
)

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {

			if (errorCatch(error) === 'jwt expired') {
				toastError('Auth finished, plz sign in again', 'Logout')
			}

			thunkAPI.dispatch(logout())

			return thunkAPI.rejectWithValue(error)
		}
	}
)