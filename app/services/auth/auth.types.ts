export interface IUser {
	id: string
	email: string
	login: string
	firstname: string
	lastname: string
	role: string
	profileImageUrl: string
	bio: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}