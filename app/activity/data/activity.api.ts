import {queryWithReauth} from "@/core/data/base.api";
 import {createApi} from "@reduxjs/toolkit/dist/query/react";
 import {getActivityUrl} from "@/core/config/api.config";
 import {IGetActivitiesRequest} from "@/activity/model/request.types";
 import {IActivity} from "@/activity/model/activity.types";

 export const activityApi = createApi({
 	reducerPath: 'activityApi',
 	baseQuery: queryWithReauth,
 	tagTypes: ['Activity'],
 	endpoints: (build) => ({

 		/**
 		 * Получить активность в компании
 		 * @param [IGetActivitiesRequest] - см. расшифровку тела запроса в интерфейсе
 		 */
 		getAwardCount: build.query<IActivity[], IGetActivitiesRequest>({
 			query: (request) => ({
 				method: 'POST',
 				url: getActivityUrl("/get_c"),
 				body: request
 			}),
 			providesTags: ['Activity']
 		}),

 	})
 })