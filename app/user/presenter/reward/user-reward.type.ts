import {IRewardRequest} from "@/user/model/reward.types";

export interface IUserRewardInput extends Omit<IRewardRequest, 'userId'> {
}