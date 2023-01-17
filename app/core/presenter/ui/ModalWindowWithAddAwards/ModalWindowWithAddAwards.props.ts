
import { IUser } from '@/user/model/user.types'
import { IAward } from 'award/model/award.types'
import { IAwardRelateUser } from 'award/model/awardRelate.types'
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, RefAttributes, SetStateAction } from "react"

export type ModalWindowWithAddAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    awards: IAward[]
    userId: string
    awardState: "NONE" | "NOMINEE" | "AWARD"
    textBtn: string
}