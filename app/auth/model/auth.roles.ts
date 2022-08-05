import {NextPage} from "next";

export type TypeRoles = {
	role?: "owner" | "admin" | "director" | "user" | "guest"
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }

export const getRolePriority = (role?: string) => {
	switch (role) {
		case "root": return 888
		case "super": return 777
		case "owner": return 90
		case "admin": return 80
		case "director": return 70
		case "user": return 60
		case "guest": return 50
		default: return 0
	}
}

export const checkRole = (userRole?: string, checkRole?: string) : boolean => {
	if (!checkRole) return true
	if (!userRole) return false
	return getRolePriority(userRole) >= getRolePriority(checkRole)
}