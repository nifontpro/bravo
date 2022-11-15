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
	tagTypes: ['Medal', 'Count'],
	endpoints: (build) => ({

		getByCompany: build.query<IMedal[], string>({
			query: (companyId) => ({
				method: 'POST',
				url: getMedalUrl("/get_company"),
				body: {companyId}
			}),
			providesTags: ['Medal']
		}),

		getById: build.query<IMedal, string>({
			query: (medalId) => ({
				method: 'POST',
				url: getMedalUrl("/get_id"),
				body: {medalId}
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

		getByCompanyAdmin: build.query<ITableItem[], { companyId: string, filter: string }>({
			query: (body) => ({
				method: 'POST',
				url: getMedalUrl("/get_company"),
				body: body
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
				invalidatesTags: ['Medal', 'Count']
			}
		),

		delete: build.mutation<void, string>({
			query: medalId => ({
				method: 'DELETE',
				url: getMedalUrl(),
				body: {medalId}
			}),
			invalidatesTags: ['Medal', 'Count']
			// invalidatesTags: (result, error, id) => [{type: 'Medal', id}]
		}),

		update: build.mutation<void, IMedalUpdate>({
			query: (medal) => ({
				method: 'PUT',
				url: getMedalUrl("/update"),
				body: medal
			}),
			// invalidatesTags: (result, error, department) => [{type: 'Medal', id: department.id}]
			invalidatesTags: [{type: 'Medal'}]
		}),

		updateImage: build.mutation<void, { medalId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getMedalUrl('/update/image'),
				params: {id: arg.medalId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'Medal'}]
			// invalidatesTags: (result, error, arg) => [{type: 'Medal', id: arg.departmentId}]
		}),

		getCountByCompany: build.query<number, string>({
			query: (companyId) => ({
				method: 'POST',
				url: getMedalUrl("/count_c"),
				body: {companyId}
			}),
			providesTags: ['Count'],
		}),

		/**
		 * Обновленная версия работы со множеством изображений сущности
		 */

		/**
		 * Добавление изображения
		 * @param: formData: imageUrl:file, medalId, description
		 */
		imageAdd: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'POST',
				url: getMedalUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Medal'}]
		}),

		/**
		 * Обновление изображения
		 * @param: formData: imageUrl:file, medalId, imageKey, description
		 */
		imageUpdate: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'PUT',
				url: getMedalUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Medal'}]
		}),

		/**
		 * Удаление изображения
		 * @param: medalId, imageKey
		 */
		imageDelete: build.mutation<void, { medalId: string, imageKey: string }>({
			query: (body) => ({
				method: 'DELETE',
				url: getMedalUrl('/image'),
				body: body
			}),
			invalidatesTags: [{type: 'Medal'}]
		}),

	})
})