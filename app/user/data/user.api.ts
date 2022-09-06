import {queryWithReauth} from "@/core/data/base.api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserCreate} from "@/user/model/user.types";
import {getRewardUrl, getUserUrl} from "@/core/config/api.config";
import {IdResponse} from "@/core/model/idResponse.types";
import {IUserUpdateRequest} from "@/user/presenter/admin/edit/user-edit.type";
import {IRewardRequest, IUserRewardsResponse} from "@/user/model/reward.types";

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: queryWithReauth,
	tagTypes: ['User', 'Reward'],
	endpoints: (build) => ({

		getByDepartment: build.query<IUser[], string>({
			query: (departmentId) => ({
				url: getUserUrl('/department'),
				params: {departmentId}
			}),
			providesTags: ['User']
		}),

		getBosses: build.query<IUser[], string | undefined>({
			query: (companyId) => ({
				url: getUserUrl('/bosses'),
				params: {companyId}
			}),
			providesTags: ['User']
		}),

		getById: build.query<IUser, string>({
			query: (userId) => ({
				url: getUserUrl(),
				params: {userId}
			}),
			providesTags: ['User']
		}),

		create: build.mutation<IdResponse, IUserCreate>({
			query: (user) => ({
				method: 'POST',
				url: getUserUrl('/create'),
				body: user
			}),
			invalidatesTags: ['User']
		}),

		delete: build.mutation<void, string>({
			query: userId => ({
				method: 'DELETE',
				url: getUserUrl(),
				params: {userId}
			}),
			invalidatesTags: ['User']
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
				params: {userId: arg.userId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'User'}]
		}),

		reward: build.mutation<void, IRewardRequest>({
			query: (request) => ({
				method: 'POST',
				url: getRewardUrl(),
				body: request
			}),
			invalidatesTags: [{type: 'Reward'}]
		}),

		getRewards: build.query<IUserRewardsResponse[], string>({
			query: (userId) => ({
				url: getRewardUrl(),
				params: {userId}
			}),
			providesTags: ['Reward']
		}),

	})
})