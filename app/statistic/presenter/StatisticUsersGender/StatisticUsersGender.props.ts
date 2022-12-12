
import { IUser } from '@/user/model/user.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type StatisticUsersGenderProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    users: IUser[]
}