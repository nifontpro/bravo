
import { IUser } from '@/user/model/user.types'
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, RefAttributes, SetStateAction } from "react"

export type ModalWindowWithAddUsersProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    users: IUser[]
    awardId: string
    awardState: "NONE" | "NOMINEE" | "AWARD"
    textBtn: string
}