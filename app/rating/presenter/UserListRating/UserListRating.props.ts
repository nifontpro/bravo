import { ICompany } from '@/company/model/company.types';
import { IUserAwards } from '@/user/model/user.types';
import { MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, RefAttributes, SetStateAction } from "react"

export type UserListRatingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    users: IUserAwards[] | undefined
    withoutCountAwards: boolean
}