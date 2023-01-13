
import { IUser } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export type UserLogoProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IUser | undefined
}