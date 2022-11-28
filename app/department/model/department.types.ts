import {ImageRef} from "@/core/model/image.types";

export interface IDepartment {
	name: string
	description?: string
	imageUrl?: string
	images : ImageRef[]
	companyId: string
	id: string
}

export interface IDepartmentCreate extends Omit<IDepartment, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
	
}