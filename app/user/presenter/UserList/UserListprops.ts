import { IUser } from '@/user/model/user.types';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type UserListProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    user: IUser
}