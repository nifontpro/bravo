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

		getByDepartment: build.query<IUser[], { departmentId: string, filter: string }>({
			query: (body) => ({
				method: 'POST',
				url: getUserUrl('/get_department'),
				body: body
			}),
			providesTags: ['User']
		}),

		getBosses: build.query<IUser[], { companyId: string | undefined, filter: string }>({
			query: (body) => ({
				method: 'POST',
				url: getUserUrl('/get_bosses'),
				body: body
			}),
			providesTags: ['User']
		}),

		getById: build.query<IUser, string>({
			query: (userId) => ({
				method: 'POST',
				url: getUserUrl('/get_id'),
				body: {userId}
			}),
			providesTags: ['User']
		}),

		getBests: build.query<IUser[], { companyId: string, limit: number }>({
			query: (body) => ({
				method: 'POST',
				url: getUserUrl('/get_best'),
				body: body
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

		// Удалить в будущем
		updateImage: build.mutation<void, { userId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getUserUrl('/image/update'),
				params: {id: arg.userId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'User'}]
		}),

		/**
		 * Обновленная версия работы со множеством изображений сущности
		 */

		/**
		 * Добавление изображения
		 * @param: formData: imageUrl:file, userId, description
		 */
		imageAdd: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'POST',
				url: getUserUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'User'}]
		}),

		/**
		 * Обновление изображения
		 * @param: formData: imageUrl:file, userId, imageKey, description
		 */
		imageUpdate: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'PUT',
				url: getUserUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'User'}]
		}),

		/**
		 * Удаление изображения
		 * @param: userId, imageKey
		 */
		imageDelete: build.mutation<void, { userId: string, imageKey: string }>({
			query: (body) => ({
				method: 'DELETE',
				url: getUserUrl('/image'),
				body: body
			}),
			invalidatesTags: [{type: 'User'}]
		}),
	})
})