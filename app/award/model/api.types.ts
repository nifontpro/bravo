import {IAward} from "./award.types";
import {AwardState} from "./awardRelate.types";

export interface IAwardCreate extends Omit<IAward, 'id' | 'imageUrl' | 'imageKey' | 'relations'> {
}

export interface IAwardUpdate extends IAwardCreate {
	id: string
}

export interface IAwardUserRequest {
	awardId: string
	userId: string
	awardState: AwardState
}