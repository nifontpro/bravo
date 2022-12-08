import {
  AwardState,
  IAwardRelate,
  IAwardRelateUser,
} from './awardRelate.types';

interface IAwardBase {
  name: string;
  description?: string;
  criteria?: string;
  startDate?: number;
  endDate?: number;
  state: AwardState;
  score?: number;
  companyId: string;

  imageUrl?: string;
  imageKey?: string;

  id: string;
}

/**
 * Тип "Награда"
 */
export interface IAward extends IAwardBase {
  relations: IAwardRelate[];
}

/**
 * Тип "Награда" для получения со списком записей с сотрудником
 * Тяжелый запрос в БД, использовать при необходимости
 */
export interface IAwardUsers extends IAwardBase {
  relateUsers: IAwardRelateUser[];
}

/**
 * Облегченный тип награды, используется при выводе списка сотрудников по рейтингам
 */
export interface IAwardLite {
  name: string;
  imageUrl?: string;
  id: string;
}

/**
 * Объединенная детализация награждения сотрудника
 * (Объединяется сама награда и запись о награждении сотрудника)
 */
export interface IAwardUnion extends Omit<IAwardBase, 'state'> {
	awardState: AwardState

	// from user award:
	userState: AwardState
	nomineeDate? : number
	awardDate?: number
	nomineeUserId?: string
	awardUserId?: string
}
