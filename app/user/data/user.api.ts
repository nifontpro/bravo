import {queryWithReauth} from "@/core/data/base.api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "@/user/model/user.types";

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: queryWithReauth,
	tagTypes: ['User'],
	endpoints: (build) => ({

		getByDepartment: build.query<IUser[], string>({
			query: (departmentId) => ({
				url: '/user/department',
				params: {departmentId}
			}),
			providesTags: ['User']
		}),

		createUser: build.mutation<void , {name: string, description: string}> ({
			query: (company) => ({
				url: '/user/create',
				method: 'POST',
				body: company
			}),
			invalidatesTags: ['User']
		})
	})
})