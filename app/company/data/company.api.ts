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
				url: '/company/owner'
			}),
			providesTags: ['Company']
		}),

		/*		createCompany: build.mutation<void, { name: string, description: string }>({
					query: (company) => ({
						url: '/company/create',
						method: 'POST',
						body: company
					}),
					invalidatesTags: [{type: 'Company'}]
				})*/
	})
})