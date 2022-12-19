
import { IUserAwardsCountDep } from '@/user/model/count.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type StatisticDepartmentsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    usersCountAwardsOnDepCompany: IUserAwardsCountDep[]
}