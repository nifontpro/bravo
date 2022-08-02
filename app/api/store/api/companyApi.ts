import {queryWithReauth} from "./apiSlice";
import {ICompany} from "../../../model/company.types";
import {createApi} from "@reduxjs/toolkit/dist/query/react";

export const companyApi = createApi({
	reducerPath: 'companyApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Company'],
	endpoints: (build) => ({
		getByOwner: build.query<ICompany[], void>({
			query: () => ({
				url: '/company/owner'
			}),
			providesTags: result => ['Company']
		})
	})
})