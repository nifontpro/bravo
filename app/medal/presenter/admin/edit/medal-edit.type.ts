import {IMedal} from "@/medal/model/medal.types";

export interface IMedalUpdate extends Omit<IMedal, 'isSystem' | 'imageUrl' | 'imageKey' | 'images'> {
}

export interface IMedalEditInput extends Omit<IMedalUpdate, 'companyId' | 'id' | 'imageUrl' | 'imageKey' | 'images'> {
	file: FileList
}