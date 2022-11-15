import {ImageRef} from "@/core/model/image.types";

export interface ICompany {
	id: string
	name: string
	description?: string
	imageUrl?: string
	images : ImageRef[]
}