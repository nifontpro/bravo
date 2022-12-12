
import { IUser } from '@/user/model/user.types'
import { IAward, IAwardUsers } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type AwardListProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    allChecked: boolean
    award: IAward
    setVisibleCheckbox: Dispatch<SetStateAction<boolean>>
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
    arrChoiceUser: string[]
}