import {queryWithReauth} from "@/core/data/base.api";
import {ICompany} from "@/company/model/company.types";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {getAdminUrl} from "@/core/config/url.config";
import {getCompanyUrl} from "@/core/config/api.config";
import {IdResponse} from "@/core/model/idResponse.types";
import {companyActions} from "@/company/data/company.slice";
import {ICompanyUpdateRequest} from "@/company/presenter/admin/edit/company-edit.type";

export const companyApi = createApi({
	reducerPath: 'companyApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Company', 'Count'],
	endpoints: (build) => ({

		getAll: build.query<ICompany[], void>({
			query: () => ({
				method: 'POST',
				url: getCompanyUrl('/all'),
				body: {filter: ""}
			}),
			providesTags: [{type: 'Company'}]
		}),

		getByOwner: build.query<ICompany[], void>({
			query: () => ({
				method: 'POST',
				url: getCompanyUrl('/owner'),
				body: {filter: ""}
			}),
			providesTags: [{type: 'Company'}]
		}),

		getOwnerAdmin: build.query<ITableItem[], string | undefined>({
			query: (filter) => ({
				method: 'POST',
				url: getCompanyUrl('/owner'),
				body: {filter}
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
					body: {ownerId: ""},
					url: getCompanyUrl('/create')
				}),
				invalidatesTags: ['Company', 'Count']
			}
		),

		delete: build.mutation<void, string>({
			query: companyId => ({
				method: 'DELETE',
				url: getCompanyUrl(),
				body: {companyId}
			}),
			invalidatesTags: ['Company', 'Count']
		}),

		getById: build.query<ICompany, string>({
			query: (companyId) => ({
				method: 'POST',
				url: getCompanyUrl("/get_id"),
				body: {companyId}
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

		update: build.mutation<void, ICompanyUpdateRequest>({
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
				params: {id: arg.companyId},
				body: arg.formData
			}),
			// invalidatesTags: (result, error, arg) => [{type: 'Company', id: arg.companyId}]
			invalidatesTags: [{type: 'Company'}]
		}),

		getCount: build.query<number, undefined>({
			query: () => ({
				method: 'POST',
				url: getCompanyUrl('/count'),
				body: {filter: ""}
			}),
			providesTags: ['Count']
		}),

		/**
		 * Обновленная версия работы со множеством изображений сущности
		 */

		/**
		 * Добавление изображения
		 * @param: formData: imageUrl:file, companyId, description
		 */
		imageAdd: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'POST',
				url: getCompanyUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Company'}]
		}),

		/**
		 * Обновление изображения
		 * @param: formData: imageUrl:file, companyId, imageKey, description
		 */
		imageUpdate: build.mutation<void, FormData>({
			query: (formData) => ({
				method: 'PUT',
				url: getCompanyUrl('/image'),
				body: formData
			}),
			invalidatesTags: [{type: 'Company'}]
		}),

		/**
		 * Удаление изображения
		 * @param: companyId, imageKey
		 */
		imageDelete: build.mutation<void, { companyId: string, imageKey: string }>({
			query: (body) => ({
				method: 'DELETE',
				url: getCompanyUrl('/image'),
				body: body
			}),
			invalidatesTags: [{type: 'Company'}]
		}),
	})
})