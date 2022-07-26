import {IUser} from "@/services/auth/auth.types";

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
}