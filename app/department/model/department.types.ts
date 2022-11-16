import {ImageRef} from "@/core/model/image.types";

export interface IDepartment {
	name: string
	description?: string
	imageUrl?: string
	images : ImageRef[]
	companyId: string
	id: string
}