import {IUser} from "@/user/model/user.types";

export interface IUserEditInput extends Omit<IUser, 'id' | 'imageUrl'> {
	password?: string
	file: FileList
}

export interface IUserUpdateRequest
	extends Omit<IUser, 'imageUrl' | 'companyId' | 'departmentId' | 'role'> {

	password?: string
}