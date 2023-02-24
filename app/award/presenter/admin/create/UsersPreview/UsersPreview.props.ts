
import { IUser } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type UsersPreviewProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceUser: string[]
    users: IUser[]
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
}   