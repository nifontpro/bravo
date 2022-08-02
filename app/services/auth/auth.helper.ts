import Cookies from "js-cookie";
import {IAuthResponse, ITokens} from "@/services/auth/auth.types";
import {REFRESH_TOKEN_LIFE} from "../../config/api.config";

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken, {expires: REFRESH_TOKEN_LIFE})
}


export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}