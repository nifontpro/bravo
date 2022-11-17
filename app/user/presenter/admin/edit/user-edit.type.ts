import {IUser} from "@/user/model/user.types";

export interface IUserEditInput extends Omit<IUser, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
	password?: string
	file: FileList
}

export interface IUserUpdateRequest
	extends Omit<IUser, 'imageUrl' | 'imageKey' | 'images' | 'companyId' | 'departmentId' | 'role'> {

	password?: string
}