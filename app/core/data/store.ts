import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from '@/auth/data/auth.slice';
import {companyApi} from '@/company/data/company.api';
import {combineReducers} from 'redux';
import {authApi, refreshApi} from '@/auth/data/auth.api';
import {companySlice} from '@/company/data/company.slice';
import {departmentApi} from '@/department/data/department.api';
import {departmentSlice} from '@/department/data/department.slice';
import {userApi} from '@/user/data/user.api';
import {modalSlice} from '@/core/store/modal.slice';
import {loginSlice} from '@/auth/data/login.slice';
import {awardApi} from 'award/data/award.api';
import {registerApi} from "@/register/data/register.api";
import {messageApi} from "@/message/data/message.api";
import {activityApi} from "@/activity/data/activity.api";

const rootReducer = combineReducers({
	login: loginSlice.reducer,
	auth: authSlice.reducer,
	company: companySlice.reducer,
	department: departmentSlice.reducer,
	modal: modalSlice.reducer,
	[registerApi.reducerPath]: registerApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[refreshApi.reducerPath]: refreshApi.reducer,
	[companyApi.reducerPath]: companyApi.reducer,
	[departmentApi.reducerPath]: departmentApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[awardApi.reducerPath]: awardApi.reducer,
	[messageApi.reducerPath]: messageApi.reducer,
	[activityApi.reducerPath]: activityApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Для сохранения WS в authSlice
		}).concat(
			registerApi.middleware,
			authApi.middleware,
			refreshApi.middleware,
			companyApi.middleware,
			departmentApi.middleware,
			userApi.middleware,
			awardApi.middleware,
			messageApi.middleware,
			activityApi.middleware,
		),
});

export type TypeRootState = ReturnType<typeof store.getState>;
// export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector