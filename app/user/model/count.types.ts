export interface IUserAwardCount {
	total: number
	awards: number
	nominee: number
}

/**
 * Составной id отдела
 */
export interface IDepName {
	id?: string
	name?: string
}

export interface IUserAwardsCountDep {
	id: IDepName
	userAwardCount: number
	userNomineeCount: number
}