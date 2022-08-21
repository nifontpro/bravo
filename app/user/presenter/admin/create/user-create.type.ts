import {IUser} from "@/user/model/user.types";

export interface IUserCreateInput extends Omit<IUser, 'id' | 'name' | 'imageUrl'> {
	firstname: string
	password: string
	file: FileList
}