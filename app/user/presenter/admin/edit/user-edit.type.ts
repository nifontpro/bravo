import {IUser} from "@/user/model/user.types";

export interface IUserEditInput extends Omit<IUser, 'id' | 'name' | 'imageUrl'> {
	firstname: string
	password?: string
	file: FileList
}

export interface IUserUpdateRequest
	extends Omit<IUser, 'name' | 'imageUrl' | 'companyId' | 'departmentId' | 'role'> {

	firstname: string
	password?: string
}