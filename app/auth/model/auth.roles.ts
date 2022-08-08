export type TypeRoles = "root" | "super" | "owner" | "admin" | "director" | "user" | "guest"

export const checkRole = (userRole: TypeRoles | undefined, minimalRole: TypeRoles): boolean => {
	if (!userRole) return false
	return getRolePriority(userRole) >= getRolePriority(minimalRole)
}

export const getRolePriority = (role: TypeRoles) => {
	switch (role) {
		case "root":
			return 888
		case "super":
			return 777
		case "owner":
			return 90
		case "admin":
			return 80
		case "director":
			return 70
		case "user":
			return 60
		case "guest":
			return 50
	}
}