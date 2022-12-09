import { ICompany } from '@/company/model/company.types';
import { IUserAwards } from '@/user/model/user.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type UserListRatingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    users: IUserAwards[] | undefined
    setSearchValue: Dispatch<SetStateAction<string>>
}