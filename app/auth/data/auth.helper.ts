import Cookies from "js-cookie";
import {IAuthResponse} from "@/auth/model/auth.types";
import {REFRESH_TOKEN_LIFE} from "@/core/config/api.config";

const refreshToken = "refreshToken"

export const removeRefreshCookie = () => {
	Cookies.remove(refreshToken)
}

export const saveRefreshToCookie = (data: IAuthResponse) => {
	Cookies.set('refreshToken', data.refreshToken, {expires: REFRESH_TOKEN_LIFE})
}

export const getRefreshCookie = () => {
	return Cookies.get(refreshToken)
}