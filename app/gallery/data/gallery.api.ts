import {queryWithReauth} from "@/core/data/base.api";
 import {createApi} from "@reduxjs/toolkit/dist/query/react";
 import {getGalleryUrl} from "@/core/config/api.config";
 import {IGalleryObject} from "../model/gallery.types";
 import {IGetGalleryRequest} from "../model/request.types";
import {IFolder} from "../model/folder.types";

 export const galleryApi = createApi({
  	reducerPath: 'galleryApi',
  	baseQuery: queryWithReauth,
  	tagTypes: ['Gallery'],
  	endpoints: (build) => ({

 	  /**
 	   * Получить список объектов из папки галереи
 		 */
 	  getGalleryObjects: build.query<IGalleryObject[], IGetGalleryRequest>({
  			query: (request) => ({
  				method: 'POST',
  				url: getGalleryUrl("/get_folder"),
  				body: request
  			}),
  			providesTags: ['Gallery']
  		}),

		  /**
		   * Получить список каталогов хранилища
		   * @param [parentId] - родительский каталог из которого получаем папки
		   * корневой каталог имеет id = "root"
		   */
		  getFolders: build.query<IFolder[], string>({
			  query: (parentId) => ({
				  method: 'POST',
				  url: getGalleryUrl("/folders"),
				  body: {parentId}
			  }),
			  providesTags: ['Gallery']
		  }),

  	})
  })