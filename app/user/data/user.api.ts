import {queryWithReauth} from "@/core/data/base.api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserCreate} from "@/user/model/user.types";
import {getUserUrl} from "@/core/config/api.config";
import {IdResponse} from "@/core/model/idResponse.types";
import {IUserUpdateRequest} from "@/user/presenter/admin/edit/user-edit.type";

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: queryWithReauth,
	tagTypes: ['User', 'Reward', 'Count'],
	endpoints: (build) => ({

		getByDepartment: build.query<IUser[], string>({
			query: (departmentId) => ({
				method: 'POST',
				url: getUserUrl('/department'),
				body: {departmentId}
			}),
			providesTags: ['User']
		}),

		getBosses: build.query<IUser[], string | undefined>({
			query: (companyId) => ({
				method: 'POST',
				url: getUserUrl('/bosses'),
				body: {companyId}
			}),
			providesTags: ['User']
		}),

		getById: build.query<IUser, string>({
			query: (userId) => ({
				method: 'POST',
				url: getUserUrl(),
				body: {userId}
			}),
			providesTags: ['User']
		}),

		create: build.mutation<IdResponse, IUserCreate>({
			query: (user) => ({
				method: 'POST',
				url: getUserUrl('/create'),
				body: user
			}),
			invalidatesTags: ['User', 'Count']
		}),

		delete: build.mutation<void, string>({
			query: userId => ({
				method: 'DELETE',
				url: getUserUrl(),
				body: {userId}
			}),
			invalidatesTags: ['User', 'Count']
		}),

		update: build.mutation<void, IUserUpdateRequest>({
			query: (user) => ({
				method: 'PUT',
				url: getUserUrl('/update'),
				body: user
			}),
			invalidatesTags: ['User']
		}),

		updateImage: build.mutation<void, { userId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getUserUrl('/image/update'),
				params: {id: arg.userId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'User'}]
		}),

		getCountByCompany: build.query<number, string>({
			query: (companyId) => ({
				method: 'POST',
				url: getUserUrl("/count_c"),
				body: {companyId}
			}),
			providesTags: ['Count']
		}),

		getCountByDepartment: build.query<number, string>({
			query: (departmentId) => ({
				method: 'POST',
				url: getUserUrl("/count_d"),
				body: {departmentId}
			}),
			providesTags: ['Count']
		}),

	})
})