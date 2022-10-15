import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {queryWithReauth} from "@/core/data/base.api";
import {IDepartment} from "../model/department.types";
import {getDepartmentUrl} from "@/core/config/api.config";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {departmentActions} from "@/department/data/department.slice";
import {IdResponse} from "@/core/model/idResponse.types";

export const departmentApi = createApi({
	reducerPath: 'departmentApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Department', 'Count'],
	endpoints: (build) => ({

		getByCompany: build.query<IDepartment[], string>({
			query: (companyId) => ({
				method: 'POST',
				url: getDepartmentUrl('/list'),
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
				params: {companyId: departmentId}
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

		getAllAdmin: build.query<ITableItem[], string>({
			query: (companyId) => ({
				method: 'POST',
				url: getDepartmentUrl('/list'),
				body: {companyId}
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

		create: build.mutation<IdResponse, string>({
				query: (companyId) => ({
					method: 'POST',
					url: getDepartmentUrl('/create'),
					body: {companyId}
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

		update: build.mutation<void, IDepartment>({
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
	})
})