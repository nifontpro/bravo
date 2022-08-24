import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/auth/data/auth.slice";
import {companyApi} from "@/company/data/company.api";
import {combineReducers} from "redux";
import {authApi, refreshApi} from "@/auth/data/auth.api";
import {companySlice} from "@/company/data/company.slice";
import {departmentApi} from "@/department/data/department.api";
import {departmentSlice} from "@/department/data/department.slice";
import {userApi} from "@/user/data/user.api";
import {medalApi} from "@/medal/data/medal.api";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	company: companySlice.reducer,
	department: departmentSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[refreshApi.reducerPath]: refreshApi.reducer,
	[companyApi.reducerPath]: companyApi.reducer,
	[departmentApi.reducerPath]: departmentApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[medalApi.reducerPath]: medalApi.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			refreshApi.middleware,
			companyApi.middleware,
			departmentApi.middleware,
			medalApi.middleware,
			userApi.middleware,
		),
})

export type TypeRootState = ReturnType<typeof store.getState>
// export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector