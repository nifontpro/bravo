
import { IUser } from '@/user/model/user.types'
import { IAward } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type ChoiceAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceAward: string[]
    setArrChoiceAward: Dispatch<SetStateAction<string[]>>
    awards: IAward[]
}   