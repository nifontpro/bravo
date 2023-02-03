import {IBaseRequest} from "@/core/model/baseRequest";

export interface IGetGalleryRequest extends IBaseRequest {
    folderId: string
}