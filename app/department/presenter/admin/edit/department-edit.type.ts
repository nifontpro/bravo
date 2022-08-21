import {IDepartment} from "@/department/model/department.types";

export interface IDepartmentEditInput extends Omit<IDepartment, 'id'> {
	file: FileList
}