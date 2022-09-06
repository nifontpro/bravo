import {IMedal} from "@/medal/model/medal.types";

export interface IRewardRequest {
	name: string
	description?: string
	score: number
	userId: string
	medalId: string
}

export interface IUserRewardsResponse {
	id: string
	name: string
	score: number
	medal: IMedal
}