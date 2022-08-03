import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/auth/data/auth.slice";
import {companyApi} from "@/company/data/company.api";
import {combineReducers} from "redux";
import {authApi, refreshApi} from "@/auth/data/auth.api";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[refreshApi.reducerPath] : refreshApi.reducer,
	[companyApi.reducerPath]: companyApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			refreshApi.middleware,
			companyApi.middleware,
		),
})

export type TypeRootState = ReturnType<typeof store.getState>