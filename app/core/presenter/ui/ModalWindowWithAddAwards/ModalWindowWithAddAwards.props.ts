
import { IUser } from '@/user/model/user.types'
import { IAwardRelateUser } from 'award/model/awardRelate.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type ModalWindowWithAddAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    users: IUser[]
    awardId: string
    awardState: "NONE" | "NOMINEE" | "AWARD"
    textBtn: string
}