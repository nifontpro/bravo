
import { IUserAwardsUnion } from '@/user/model/user.types'
import { IAwardUnion, IAwardUsers } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type CardAwardRewardedProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: IAwardUnion
    user: IUserAwardsUnion
}