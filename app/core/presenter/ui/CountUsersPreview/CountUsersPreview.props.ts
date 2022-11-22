import { IUser } from '@/user/model/user.types'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type CountUsersPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    usersInDepartment: IUser[] | undefined
    listUserVisible: boolean
}