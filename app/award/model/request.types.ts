import {IBaseRequest} from "@/core/model/baseRequest";

export interface IGetAwardsWithUserRequest extends IBaseRequest {
    companyId: string
}