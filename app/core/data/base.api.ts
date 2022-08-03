import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {API_SERVER_URL} from "../config/api.config";
import {TypeRootState} from "@/core/data/store";
import Cookies from "js-cookie";
import {IAuthResponse} from "@/auth/model/auth.types";
import {authActions} from "@/auth/data/auth.slice";

export const baseQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
})

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

export const refreshQuery = fetchBaseQuery({
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
				const refreshResponse = refreshResult.data as IAuthResponse
				api.dispatch(authActions.setState(refreshResponse))
				// retry the original query with new access token
				result = await accessQuery(args, api, extraOptions)
			} else {
				api.dispatch(authActions.logout())
			}
		}

		return result
	}