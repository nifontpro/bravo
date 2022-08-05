export interface IUser {
	id: string
	email: string
	login: string | null
	name: string
	lastname: string | null
	role: string
	imageUrl: string | null
	bio: string | null
}