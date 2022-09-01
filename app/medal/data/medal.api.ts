import {queryWithReauth} from "@/core/data/base.api";
import {getMedalUrl} from "@/core/config/api.config";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IMedal} from "@/medal/model/medal.types";
import {IdResponse} from "@/core/model/idResponse.types";
import {IMedalUpdate} from "@/medal/presenter/admin/edit/medal-edit.type";

export const medalApi = createApi({
	reducerPath: 'medalApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Medal'],
	endpoints: (build) => ({

		getByCompany: build.query<IMedal[], string>({
			query: (companyId) => ({
				url: getMedalUrl("/list"),
				params: {companyId}
			}),
			providesTags: ['Medal']
		}),

		getById: build.query<IMedal, string>({
			query: (medalId) => ({
				url: getMedalUrl(),
				params: {medalId}
			}),
			providesTags: [{type: 'Medal'}]
			// providesTags: (result, error, id) => [{type: 'Medal', id}]
		}),

		getByUserId: build.query<IMedal[], string>({
			query: (userId) => ({
				url: getMedalUrl("/user"),
				params: {userId}
			}),
			providesTags: ['Medal']
		}),

		getByCompanyAdmin: build.query<ITableItem[], string>({
			query: (companyId) => ({
				url: getMedalUrl("/list"),
				params: {companyId}
			}),
			providesTags: ['Medal'],
			transformResponse: (response: IMedal[]) =>
				response.map(medal => ({
						id: medal.id,
						editUrl: getAdminUrl(`medal/edit/${medal.id}`),
						items: [medal.name, medal.score?.toString() || '-', medal.id]
					})
				)
		}),

		create: build.mutation<IdResponse, string>({
				query: (companyId) => ({
					method: 'POST',
					url: getMedalUrl('/create'),
					body: {companyId, isSystem: false}
				}),
				invalidatesTags: ['Medal']
			}
		),

		delete: build.mutation<void, string>({
			query: medalId => ({
				method: 'DELETE',
				url: getMedalUrl(),
				params: {medalId}
			}),
			invalidatesTags: [{type: 'Medal'}]
			// invalidatesTags: (result, error, id) => [{type: 'Medal', id}]
		}),

		update: build.mutation<void, IMedalUpdate>({
			query: (medal) => ({
				method: 'PUT',
				url: getMedalUrl(),
				body: medal
			}),
			// invalidatesTags: (result, error, department) => [{type: 'Medal', id: department.id}]
			invalidatesTags: [{type: 'Medal'}]
		}),

		updateImage: build.mutation<void, { medalId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getMedalUrl('/image'),
				params: {medalId: arg.medalId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'Medal'}]
			// invalidatesTags: (result, error, arg) => [{type: 'Medal', id: arg.departmentId}]
		}),

		assign: build.mutation<void, { userId: string, medalId: string }>({
			query: ({medalId, userId}) => ({
				method: 'POST',
				url: getMedalUrl('/assign'),
				params: {userId, medalId}
			}),
		}),
	})
})