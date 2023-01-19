import { IUser } from '@/user/model/user.types'
import { IAwardUsers } from 'award/model/award.types'
import { IAwardRelateUser } from 'award/model/awardRelate.types'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type CountUsersPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    usersInDepartment?: IUser[] | undefined
    usersAwards?: IAwardRelateUser[] | undefined
    listUserVisible?: boolean
    appearanceBtn: 'black' | 'white'
}