import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery, refreshQuery} from "@/core/data/base.api";
import {IAuthResponse} from "@/auth/model/auth.types";
import {authActions} from "@/auth/data/auth.slice";
import {getAuthUrl, getRegisterUrl} from "@/core/config/api.config";
import { ILoginInput } from '../model/auth.interface';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQuery,
	tagTypes: ['Auth'],
	endpoints: (build) => ({

		/**
		 * Вход пользователя
		 * @param: login, password
		 */
		login: build.mutation<IAuthResponse, { login: string, password: string }>({
			query: (body) => ({
				url: getAuthUrl('/login'),
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['Auth'],
			async onQueryStarted(args, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					await dispatch(authActions.setState(data));
				} catch (error) {
					console.error(`ERROR LOGIN!`, error)
				}
			},
		}),

		registerStepOne: build.mutation<void, ILoginInput>({
			query: (body) => ({
				url: getRegisterUrl('/owner/temp'),
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['Auth'],
		}),

		registerStepTwo: build.mutation<IAuthResponse, {code: string, email: string}>({
			query: (body) => ({
				url: getRegisterUrl('/owner/valid'),
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['Auth'],
			// async onQueryStarted(args, {dispatch, queryFulfilled}) {
			// 	try {
			// 		const {data} = await queryFulfilled;
			// 		await dispatch(authActions.setState(data));
			// 	} catch (error) {
			// 		console.error(`REGISTER ERROR!`, error)
			// 	}
			// },
		}),

		register: build.mutation<IAuthResponse, { email: string, password: string }>({
			query: (body) => ({
				url: getAuthUrl('/register'),
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['Auth'],
			async onQueryStarted(args, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					await dispatch(authActions.setState(data));
				} catch (error) {
					console.error(`REGISTER ERROR!`, error)
				}
			},
		}),
	})
})

export const refreshApi = createApi({
	reducerPath: 'refreshApi',
	baseQuery: refreshQuery,
	tagTypes: ['Refresh'],
	endpoints: (build) => ({ 
		refresh: build.mutation<IAuthResponse, void>({
			query: () => ({
				method: 'POST',
				url: getAuthUrl('/refresh'),
				body: {filter: ""}
			}),
			async onQueryStarted(args, {dispatch, queryFulfilled}) {
					await dispatch(authActions.setLoading(true))
				try {
					const {data} = await queryFulfilled;
					await dispatch(authActions.setState(data))
					await dispatch(authActions.setLoading(false))
				} catch (error) {
					console.error(`ERROR refresh!`, error)
					await dispatch(authActions.setLoading(false))
				}
			},
		}),
	})
})