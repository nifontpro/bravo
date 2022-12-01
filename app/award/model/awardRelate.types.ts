import {IUser} from "@/user/model/user.types";

export type AwardState = "NONE" | "NOMINEE" | "AWARD"

/**
 * Запись о награждении каждого сотрудника
 */
export interface IAwardRelate {
	userId: string
	state: AwardState
	nomineeDate: number
	awardDate: number
	nomineeUserId?: string
	awardUserId?: string
}

/**
 * Запись о награждении каждого сотрудника
 * Для получения от сервера с конкретным сотрудником
 */
export interface IAwardRelateUser {
	user: IUser
	state: AwardState
	nomineeDate: number
	awardDate: number
	nomineeUser?: IUser
	awardUser?: IUser
}