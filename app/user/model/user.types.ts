import {TypeRoles} from "@/auth/model/auth.roles";

export interface IUser {
	id: string
	email: string
	login?: string
	name: string
	lastname?: string
	role: TypeRoles
	imageUrl?: string
	bio: string | null
}