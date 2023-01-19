
import { IUserAwardsUnion } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type SingleUserNomineeProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IUserAwardsUnion
}