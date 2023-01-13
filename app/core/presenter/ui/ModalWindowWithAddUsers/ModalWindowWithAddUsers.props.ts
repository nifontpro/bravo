
import { IUser } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type ModalWindowWithAddUsersProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    users: IUser[]
    awardId: string
    awardState: "NONE" | "NOMINEE" | "AWARD"
    textBtn: string
}