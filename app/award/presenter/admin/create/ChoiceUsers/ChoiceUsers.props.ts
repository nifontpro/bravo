
import { IUser } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type ChoiceUsersProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceUser: string[]
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
    users: IUser[]
}   