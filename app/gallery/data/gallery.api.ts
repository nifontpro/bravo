import {queryWithReauth} from "@/core/data/base.api";
 import {createApi} from "@reduxjs/toolkit/dist/query/react";
 import {getGalleryUrl} from "@/core/config/api.config";
 import {IGalleryObject} from "../model/gallery.types";
 import {IGetGalleryRequest} from "../model/request.types";

 export const galleryApi = createApi({
  	reducerPath: 'galleryApi',
  	baseQuery: queryWithReauth,
  	tagTypes: ['Gallery'],
  	endpoints: (build) => ({

 	  /**
 	   * Получить список объектов из папки галереи
 		 */
 	  getAwardCount: build.query<IGalleryObject[], IGetGalleryRequest>({
  			query: (request) => ({
  				method: 'POST',
  				url: getGalleryUrl("/get_folder"),
  				body: request
  			}),
  			providesTags: ['Gallery']
  		}),

  	})
  })