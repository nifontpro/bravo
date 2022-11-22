
import { IUser } from '@/user/model/user.types'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type ListUserProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    listUserVisible: boolean,
    usersInDepartment: IUser[] | undefined
}