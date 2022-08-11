import {queryWithReauth} from "@/core/data/base.api";
import {ICompany} from "@/company/model/company.types";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {getCompanyUrl} from "@/core/config/api.config";

export const companyApi = createApi({
	reducerPath: 'companyApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Company'],
	endpoints: (build) => ({

		getAll: build.query<ICompany[], void>({
			query: () => ({
				url: '/company/all'
			}),
			providesTags: ['Company']
		}),

		getAllAdmin: build.query<ITableItem[], void>({
			query: () => ({
				url: '/company/all'
			}),
			providesTags: ['Company'],
			transformResponse: (response: ICompany[]) =>
				response.map(company => ({
						id: company.id,
						editUrl: getAdminUrl(`company/edit/${company.id}`),
						items: [company.name, company.description || '', company.id]
					})
				)
		}),

		create: build.mutation<string, void>({
				query: () => ({
					url: getCompanyUrl('/create'),
					method: 'POST'
				}),
				invalidatesTags: ['Company']
			}
		),

		delete: build.mutation<void, string>({
			query: companyId => ({
				url: getCompanyUrl(),
				params: {companyId},
				method: 'DELETE'
			}),
			invalidatesTags: ['Company']
		}),

		getByOwner: build.query<ICompany[], void>({
			query: () => ({
				url: getCompanyUrl('/owner')
			}),
			providesTags: ['Company']
		}),

		getById: build.query<ICompany, string>({
			query: (companyId) => ({
				url: getCompanyUrl(),
				params: {companyId}
			}),
			providesTags: (result, error, id) => [{type: 'Company', id}]
		}),

		update: build.mutation<void, ICompany>({
			query: (company) => ({
				method: 'PUT',
				url: getCompanyUrl('/update'),
				body: company
			}),
			invalidatesTags: (result, error, company) => [{type: 'Company', id: company.id}]
		}),

		updateImage: build.mutation<void, { companyId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getCompanyUrl('/image/update'),
				params: {companyId: arg.companyId},
				body: arg.formData
			}),
			invalidatesTags: (result, error, arg) => [
				{type: 'Company', id: arg.companyId}
			]
		}),
	})
})