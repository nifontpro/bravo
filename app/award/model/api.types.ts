import {IAward} from "./award.types";
import {AwardState} from "./awardRelate.types";

export interface IAwardCreate extends Omit<IAward, 'id' | 'imageUrl' | 'imageKey' | 'relations' | 'state'> {
	file: FileList
}

export interface IAwardUpdate extends IAwardCreate {
	id: string
}

export interface IAwardUserRequest {
	awardId: string
	userId: string
	awardState: AwardState
}