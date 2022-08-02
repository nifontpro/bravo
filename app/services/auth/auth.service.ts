import {axiosClassic} from "../../api/interceptors";
import {getAuthUrl} from "../../config/api.config";
import {removeTokensStorage, saveToStorage} from "@/services/auth/auth.helper";
import Cookies from "js-cookie";
import {IAuthResponse} from "@/services/auth/auth.types";

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/register'),
			{email, password})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'),
			{email, password})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},

	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.get<IAuthResponse>(getAuthUrl('/refresh'),
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${refreshToken}`
				}
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	}
}