import {queryWithReauth} from "@/core/data/base.api";
import {ICompany} from "@/company/model/company.types";
import {createApi} from "@reduxjs/toolkit/dist/query/react";

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

		getByOwner: build.query<ICompany[], void>({
			query: () => ({
				url: '/company/owner'
			}),
			providesTags: ['Company']
		}),

		createCompany: build.mutation<void , {name: string, description: string}> ({
			query: (company) => ({
				url: '/company/create',
				method: 'POST',
				body: company
			}),
			invalidatesTags: ['Company']
		})
	})
})