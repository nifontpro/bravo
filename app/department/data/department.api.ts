import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {queryWithReauth} from "@/core/data/base.api";
import {IDepartment} from "./department.types";
import {getDepartmentUrl} from "@/core/config/api.config";

export const departmentApi = createApi({
	reducerPath: 'departmentApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Departments', 'Department'],
	endpoints: (build) => ({

		getByCompany: build.query<IDepartment[], string>({
			query: (companyId) => ({
				url: getDepartmentUrl('/list'),
				params: {companyId}
			}),
			providesTags: ['Departments']
		}),

		getById: build.query<IDepartment, string>({
			query: (departmentId) => ({
				url: getDepartmentUrl(),
				params: {departmentId}
			}),
			providesTags: ['Department']
		}),

		getByIdParams: build.mutation<IDepartment, string>({
			query: (departmentId) => ({
				method: 'GET',
				url: getDepartmentUrl(),
				params: {departmentId}
			}),
			invalidatesTags: ['Department']
		})
	})
})