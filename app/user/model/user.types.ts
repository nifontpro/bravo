import {TypeRoles} from "@/auth/model/auth.roles";
import {ImageRef} from "@/core/model/image.types";
import {IAwardLite} from "../../award/model/award.types";

export interface IUser {
	id: string
	email?: string
	login?: string
	name: string
	patronymic?: string
	lastname?: string
	role: TypeRoles
	bio?: string
	isMNC: boolean
	companyId?: string
	departmentId?: string
	departmentName?: string

	post?: string
	phone?: string
	gender: 'MALE' | 'FEMALE' | 'UNDEFINED'
	description?: string

	imageUrl?: string
	imageKey?: string
	images: ImageRef[]
}

export interface IUserCreate extends Omit<IUser, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
	password: string
}


/**
 * Сотрудники со списком наград
 */
export interface IUserAwards extends IUser {
	awards: IAwardLite[]
}
