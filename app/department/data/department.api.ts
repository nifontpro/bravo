import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {queryWithReauth} from "@/core/data/base.api";
import {IDepartment} from "./department.types";
import {getDepartmentUrl} from "@/core/config/api.config";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";

export const departmentApi = createApi({
	reducerPath: 'departmentApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Department'],
	endpoints: (build) => ({

		getByCompany: build.query<IDepartment[], string>({
			query: (companyId) => ({
				url: getDepartmentUrl('/list'),
				params: {companyId}
			}),
			providesTags: ['Department']
		}),

		getById: build.query<IDepartment, string>({
			query: (departmentId) => ({
				url: getDepartmentUrl(),
				params: {departmentId}
			}),
			providesTags: (result, error, id) => [{type: 'Department', id}]
		}),

		getAllAdmin: build.query<ITableItem[], string>({
			query: (companyId) => ({
				url: getDepartmentUrl('/list'),
				params: {companyId}
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

		create: build.mutation<string, string>({
				query: (companyId) => ({
					method: 'POST',
					url: getDepartmentUrl('/create'),
					params: {companyId}
				}),
				invalidatesTags: ['Department']
			}
		),

		delete: build.mutation<void, string>({
			query: departmentId => ({
				method: 'DELETE',
				url: getDepartmentUrl(),
				params: {departmentId}
			}),
			invalidatesTags: (result, error, id) => [{type: 'Department', id}]
		}),

		update: build.mutation<void, IDepartment>({
			query: (department) => ({
				method: 'PUT',
				url: getDepartmentUrl('/update'),
				body: department
			}),
			invalidatesTags: (result, error, department) => [{type: 'Department', id: department.id}]
		}),

		updateImage: build.mutation<void, { departmentId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getDepartmentUrl('/image/update'),
				params: {departmentId: arg.departmentId},
				body: arg.formData
			}),
			invalidatesTags: (result, error, arg) => [{type: 'Department', id: arg.departmentId}]
		}),
	})
})