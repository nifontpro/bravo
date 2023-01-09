import { IUserLite } from '@/user/model/user.types';
import { IAwardLite } from '@/award/model/award.types';

export type ActivityState =
  | 'NONE'
  | 'NOMINEE_USER' // Сотрудник номинирован
  | 'AWARD_USER' // Сотрудник награжден
  | 'DELETE_AWARD_USER' // Удаление награждения у сотрудника
  | 'DELETE_AWARD' // Удаление награждения
  | 'DELETE_USER'; // Удаление сотрудника

export interface IActivity {
  user?: IUserLite; // если удален, то null
  award?: IAwardLite; // аналогично
  companyId: string;

  state: ActivityState;
  date: number; // дата события
  departmentName?: string; // отдел сотрудника

  id: string;
}
