import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/auth/data/auth.slice";
import {companyApi} from "@/company/data/company.api";
import {combineReducers} from "redux";
import {authApi, refreshApi} from "@/auth/data/auth.api";
import {companySlice} from "@/company/data/company.slice";
import {departmentApi} from "@/department/data/department.api";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	company: companySlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[refreshApi.reducerPath] : refreshApi.reducer,
	[companyApi.reducerPath]: companyApi.reducer,
	[departmentApi.reducerPath]: departmentApi.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			refreshApi.middleware,
			companyApi.middleware,
			departmentApi.middleware
		),
})

export type TypeRootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector