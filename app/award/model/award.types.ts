import {AwardState, IAwardRelate, IAwardRelateUser} from "./awardRelate.types";

/**
 * Тип "Награда"
 */
export interface IAward {
	name: string
	description?: string
	criteria?: string
	startDate?: number
	endDate?: number
	state: AwardState
	score?: number
	companyId: string
	relations: IAwardRelate[]

	imageUrl?: string
	imageKey?: string

	id: string
}

/**
 * Тип "Награда" для получения со списком записей с сотрудником
 * Тяжелый запрос в БД, использовать при необходимости
 */
export interface IAwardUsers {
	name: string
	description?: string
	criteria?: string
	startDate?: number
	endDate?: number
	state: AwardState
	score?: number
	companyId: string
	relateUsers: IAwardRelateUser[]

	imageUrl?: string
	imageKey?: string

	id: string
}