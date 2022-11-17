import {ICompany} from "@/company/model/company.types";

export interface ICompanyUpdateRequest extends Omit<ICompany, 'imageUrl' | 'imageKey' | 'images'> {
}

export interface ICompanyEditInput extends Omit<ICompany, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
	file: FileList
}