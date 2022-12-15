import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {queryWithReauth} from "@/core/data/base.api";
import {IDepartment, IDepartmentCreate} from "../model/department.types";
import {getDepartmentUrl} from "@/core/config/api.config";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {departmentActions} from "@/department/data/department.slice";
import {IdResponse} from "@/core/model/idResponse.types";
import {IDepartmentUpdateRequest} from "@/department/presenter/admin/edit/department-edit.type";

export const departmentApi = createApi({
	reducerPath: 'departmentApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Department', 'Count'],
	endpoints: (build) => ({

		//Получить все отделы из компании
		getByCompany: build.query<IDepartment[], string>({
			query: (companyId) => ({
				method: 'POST',
				url: getDepartmentUrl('/get_company'),
				body: {companyId}
			}),
			providesTags: ['Department']
		}),

		getById: build.query<IDepartment, string>({
			query: (departmentId) => ({
				method: 'POST',
				url: getDepartmentUrl("/get_id"),
				body: {departmentId}
			}),
			providesTags: ['Department']
			// providesTags: (result, error, id) => [{type: 'Department', id}]
		}),

		setById: build.mutation<IDepartment, string>({
			query: (departmentId) => ({
				method: 'POST',
				url: getDepartmentUrl("/get_id"),
				body: {departmentId}
			}),
			invalidatesTags: ['Department'],
			async onQueryStarted(args, {dispatch, queryFulfilled}) {
				try {
					const {data: department} = await queryFulfilled;
					await dispatch(departmentActions.setState(department));
				} catch (error) {
					console.error(`Error set department by Id!`, error)
				}
			},
		}),

		getByCompanyAdmin: build.query<ITableItem[], { companyId: string, filter: string }>({
			query: (body) => ({
				method: 'POST',
				url: getDepartmentUrl('/get_company'),
				body: body
			}),
			providesTags: ['Department'],
			transformResponse: (response: IDepartment[]) =>
				response.map(department => ({
						id: department.id,
						editUrl: getAdminUrl(`department/edit/${department.id}`),
						items: [department.name, department.description || '-', department.id]
					})
				)
		}),

		create: build.mutation<IDepartment, IDepartmentCreate>({
				query: (department) => ({
					method: 'POST',
					url: getDepartmentUrl(),
					body: department
				}),
				invalidatesTags: ['Department', 'Count']
			}
		),

		// Ошибка: При удалении отдела, он остается выбранным по умолчанию
		delete: build.mutation<void, string>({
			query: departmentId => ({
				method: 'DELETE',
				url: getDepartmentUrl(),
				body: {departmentId}
			}),
			invalidatesTags: ['Department', 'Count']
			// invalidatesTags: (result, error, id) => [{type: 'Department', id}]
		}),

		update: build.mutation<void, IDepartmentUpdateRequest>({
			query: (department) => ({
				method: 'PUT',
				url: getDepartmentUrl('/update'),
				body: department
			}),
			// invalidatesTags: (result, error, department) => [{type: 'Department', id: department.id}]
			invalidatesTags: ['Department']
		}),

		updateImage: build.mutation<void, { departmentId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getDepartmentUrl('/image/update'),
				params: {id: arg.departmentId},
				body: arg.formData
			}),
			invalidatesTags: [{type: 'Department'}]
			// invalidatesTags: (result, error, arg) => [{type: 'Department', id: arg.departmentId}]
		}),

		/**
		 * Количество отделов в компании
		 */
		getCount: build.query<number, string>({
			query: (companyId) => ({
				method: 'POST',
				url: getDepartmentUrl("/count"),
				body: {companyId}
			}),
			providesTags: ['Department']
			// providesTags: (result, error, id) => [{type: 'Department', id}]
		}),

		/**
		 * Обновленная версия работы со множеством изображений сущности
		 */

		/**
		 * Добавление изображения
		 * @param: formData: imageUrl:file, departmentId, description
		 */
		imageAdd: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'POST',
				url: getDepartmentUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Department'}]
		}),

		/**
		 * Обновление изображения
		 * @param: formData: imageUrl:file, departmentId, imageKey, description
		 */
		imageUpdate: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'PUT',
				url: getDepartmentUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Department'}]
		}),

		/**
		 * Удаление изображения
		 * @param: departmentId, imageKey
		 */
		imageDelete: build.mutation<void, { departmentId: string, imageKey: string }>({
			query: (body) => ({
				method: 'DELETE',
				url: getDepartmentUrl('/image'),
				body: body
			}),
			invalidatesTags: [{type: 'Department'}]
		}),

	})
})