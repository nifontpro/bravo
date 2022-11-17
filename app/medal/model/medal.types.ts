import {ImageRef} from "@/core/model/image.types";

export interface IMedal {
	name: string
	description?: string
	score?: number
	companyId?: string
	isSystem: boolean

	imageUrl?: string
	imageKey?: string
	images : ImageRef[]

	id: string
}