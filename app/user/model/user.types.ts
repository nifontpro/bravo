import {TypeRoles} from "@/auth/model/auth.roles";
import {ImageRef} from "@/core/model/image.types";

export interface IUser {
	id: string
	email?: string
	login?: string
	password?: string
	name: string
	patronymic?: string
	lastname?: string
	role: TypeRoles
	imageUrl?: string
	imageKey?: string
	images: ImageRef[]
	bio?: string,
	isMNC: boolean,
	companyId?: string
	departmentId?: string
}

export interface IUserCreate extends Omit<IUser, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
}