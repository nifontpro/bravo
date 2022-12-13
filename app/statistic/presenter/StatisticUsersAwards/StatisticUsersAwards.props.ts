
import {  IUserAwardsUnion } from '@/user/model/user.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type StatisticUsersAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    users: IUserAwardsUnion[]
}