import {ImageRef} from "@/core/model/image.types";

export interface IMedal {
	name: string
	description?: string
	imageUrl?: string
	images? : ImageRef[]
	score?: number
	companyId?: string
	isSystem: boolean
	id: string
}