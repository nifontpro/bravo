import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {API_SERVER_URL} from "../../../config/api.config";
import {TypeRootState} from "../store";
import {setAuthState, setLogout} from "../auth/auth.slice";
import Cookies from "js-cookie";
import {IAuthResponse} from "@/services/auth/auth.types";

const accessQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
	prepareHeaders: (headers, {getState}) => {
		const token = (getState() as TypeRootState).auth.accessToken
		if (token) {
			headers.set("authorization", `Bearer ${token}`)
		}
		return headers
	}
})

const refreshQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
	prepareHeaders: (headers) => {
		const token = Cookies.get('refreshToken')
		if (token) {
			headers.set("authorization", `Bearer ${token}`)
		}
		return headers
	}
})

export const queryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
	async (args, api, extraOptions) => {
		let result = await accessQuery(args, api, extraOptions)

		if (result.error && result.error.status === 401) {
			const refreshResult = await refreshQuery('/auth/refresh', api, extraOptions)
			if (refreshResult?.data) {
				api.dispatch(setAuthState(refreshResult.data as IAuthResponse))
				// retry the original query with new access token
				result = await accessQuery(args, api, extraOptions)
			} else {
				api.dispatch(setLogout())
			}
		}

		return result
	}