import {IDepartment} from "@/department/model/department.types";

export interface IDepartmentUpdateRequest extends Omit<IDepartment, 'imageUrl' | 'imageKey' | 'images'> {
}

export interface IDepartmentEditInput extends Omit<IDepartment, 'id' | 'companyId' | 'imageUrl' | 'imageKey' | 'images'> {
	file: FileList
}