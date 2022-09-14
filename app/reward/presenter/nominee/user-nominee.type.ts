import {INomineeRequest} from "../../model/reward.types";

export interface IUserNomineeInput extends Omit<INomineeRequest, 'userId' | 'companyId'> {
}