import {IReward} from "./reward.types";

export interface IRewardInfo {
	reward: IReward,
	mncSignatures: IMncSignature[]
	allSignatures: boolean
}

interface IMncSignature {
	mncId: string
	sign: boolean
	dateSign?: number
	name: string
	patronymic?: string
	lastname?: string
}