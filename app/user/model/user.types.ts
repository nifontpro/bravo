import {TypeRoles} from "@/auth/model/auth.roles";

export interface IUser {
	id: string
	email: string
	login: string | null
	name: string
	lastname: string | null
	role: TypeRoles
	imageUrl: string | null
	bio: string | null
}