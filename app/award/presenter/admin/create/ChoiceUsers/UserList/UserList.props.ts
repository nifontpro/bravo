
import { IUser } from '@/user/model/user.types'
import { IAwardUsers } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type UserListProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    allChecked: boolean
    user: IUser
    setVisibleCheckbox: Dispatch<SetStateAction<boolean>>
}