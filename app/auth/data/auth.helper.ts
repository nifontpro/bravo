import Cookies from "js-cookie";
import {IAuthResponse} from "@/auth/model/auth.types";
import {REFRESH_TOKEN_LIFE} from "@/core/config/api.config";

export const removeTokenStorage = () => {
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	Cookies.set('refreshToken', data.refreshToken, {expires: REFRESH_TOKEN_LIFE})
}