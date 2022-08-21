import {ICompany} from "@/company/model/company.types";

export interface ICompanyEditInput extends Omit<ICompany, 'id'> {
	file: FileList
}