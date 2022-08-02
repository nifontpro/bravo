import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth/auth.slice";
import {companyApi} from "./api/companyApi";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	[companyApi.reducerPath]: companyApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(companyApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>