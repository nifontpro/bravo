import {IUser} from "@/services/auth/auth.types";

export interface IAuthInitialState {
	user: IUser | null
	isLoading: boolean
	accessToken: string
}

export interface IEmailPassword {
	email: string
	password: string
}