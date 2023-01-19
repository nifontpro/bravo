
// import { IUserAwardsUnion } from '@/user/model/user.types'
import { IAwardUnion } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type CardNomineeUserProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    userId: string
    award: IAwardUnion
}