import { ILoginInput } from '@/auth/model/auth.interface';

export interface ILoginPasswordCheck extends ILoginInput {
  passwordCheck?: string;
}
 