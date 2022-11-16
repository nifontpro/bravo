import {IUser} from "@/user/model/user.types";

export interface IUserCreateInput extends Omit<IUser, 'id' | 'imageUrl'> {
	password: string
	file: FileList
}