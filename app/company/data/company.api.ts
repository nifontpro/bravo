import {queryWithReauth} from "@/core/data/base.api";
import {ICompany} from "@/company/model/company.types";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {getCompanyUrl} from "@/core/config/api.config";
import {IdResponse} from "@/core/model/idResponse.types";
import {companyActions} from "@/company/data/company.slice";

export const companyApi = createApi({
	reducerPath: 'companyApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Company'],
	endpoints: (build) => ({

		getAll: build.query<ICompany[], void>({
			query: () => ({
				url: getCompanyUrl('/all')
			}),
			providesTags: [{type: 'Company'}]
		}),

		getByOwner: build.query<ICompany[], void>({
			query: () => ({
				url: getCompanyUrl('/owner')
			}),
			providesTags: [{type: 'Company'}]
		}),

		getOwnerAdmin: build.query<ITableItem[], void>({
			query: () => ({
				url: getCompanyUrl('/owner')
			}),
			providesTags: [{type: 'Company'}],
			transformResponse: (response: ICompany[]) =>
				response.map(company => ({
						id: company.id,
						editUrl: getAdminUrl(`company/edit/${company.id}`),
						items: [company.name, company.description || '-', company.id]
					})
				)
		}),

		create: build.mutation<IdResponse, void>({
				query: () => ({
					method: 'POST',
					url: getCompanyUrl('/create')
				}),
				invalidatesTags: ['Company']
			}
		),

		delete: build.mutation<void, string>({
			query: companyId => ({
				method: 'DELETE',
				url: getCompanyUrl(),
				params: {companyId}
			}),
			invalidatesTags: [{type: 'Company'}]
		}),

		getById: build.query<ICompany, string>({
			query: (companyId) => ({
				url: getCompanyUrl(),
				params: {companyId}
			}),
			providesTags: (result, error, id) => [{type: 'Company', id}]
		}),

		setById: build.mutation<ICompany, string>({
			query: (companyId) => ({
				method: 'GET',
				url: getCompanyUrl(),
				params: {companyId}
			}),
			invalidatesTags: [{type: 'Company'}],
			async onQueryStarted(args, {dispatch, queryFulfilled}) {
				try {
					const {data: company} = await queryFulfilled;
					await dispatch(companyActions.setState(company));
				} catch (error) {
					console.error(`ERROR SET COMPANY BY Id!`, error)
				}
			},
		}),

		update: build.mutation<void, ICompany>({
			query: (company) => ({
				method: 'PUT',
				url: getCompanyUrl('/update'),
				body: company
			}),
			// invalidatesTags: (result, error, company) => [{type: 'Company', id: company.id}]
			invalidatesTags: [{type: 'Company'}]
		}),

		updateImage: build.mutation<void, { companyId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getCompanyUrl('/image/update'),
				params: {companyId: arg.companyId},
				body: arg.formData
			}),
			// invalidatesTags: (result, error, arg) => [{type: 'Company', id: arg.companyId}]
			invalidatesTags: [{type: 'Company'}]
		}),
	})
})