import { ICompany } from '@/company/model/company.types';
import { IUserAwards } from '@/user/model/user.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type UserListRatingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    users: IUserAwards[] | undefined
}