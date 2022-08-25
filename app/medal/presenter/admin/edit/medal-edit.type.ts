import {IMedal} from "@/medal/model/medal.types";

export interface IMedalUpdate extends Omit<IMedal, 'isSystem'> {
}

export interface IMedalEditInput extends Omit<IMedalUpdate, 'companyId' | 'id'> {
	file: FileList
}