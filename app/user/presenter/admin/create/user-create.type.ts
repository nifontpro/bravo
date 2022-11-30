import {IUser} from "@/user/model/user.types";

export interface IUserCreateInput extends Omit<IUser, 'id' | 'imageUrl' | 'departmentName'> {
	password: string
	file: FileList
}