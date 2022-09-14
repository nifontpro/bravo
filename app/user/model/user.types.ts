import {TypeRoles} from "@/auth/model/auth.roles";

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
	bio?: string,
	isMNC: boolean,
	companyId?: string
	departmentId?: string
}

export interface IUserCreate extends Omit<IUser, 'id' | 'name' | 'imageUrl'> {
	firstname: string
}