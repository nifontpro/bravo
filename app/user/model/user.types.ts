import {TypeRoles} from "@/auth/model/auth.roles";
import {ImageRef} from "@/core/model/image.types";
import {IAwardLite, IAwardUnion} from "../../award/model/award.types";

export interface IUser {
  id: string;
  email?: string;
  login?: string;
  name: string;
  patronymic?: string;
  lastname?: string;
  role: TypeRoles;
  bio?: string;
  isMNC: boolean;
  companyId?: string;
  departmentId?: string;
  departmentName?: string;
  post?: string;
  phone?: string;
  gender: 'MALE' | 'FEMALE' | 'UNDEFINED';
  description?: string;
  imageUrl?: string;
  imageKey?: string;
  images: ImageRef[];
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'imageUrl' | 'imageKey' | 'images'> {

  /**
   * Параметр для режима разработки:
   * В тестовом режиме, если параметр true, пароль не генерируется, а имеет значение "testPsw",
   * в противном случае, или если параметр отсутствует сгенерированный пароль
   * отправляется на указанную почту сотрудника
    */

  test?: boolean
}

/**
 * Сотрудники со списком наград
 * (облегченная версия для списка)
 */
export interface IUserAwards extends IUser {
  awardCount: number
  awards: IAwardLite[];
}

/**
 * Сотрудник со списком наград с объединенной детализацией
 */
export interface IUserAwardsUnion extends IUser {
	awards: IAwardUnion[]
}
