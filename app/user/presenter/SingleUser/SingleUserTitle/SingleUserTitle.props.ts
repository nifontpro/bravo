
import { IUserAwardsUnion } from '@/user/model/user.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react"

export type SingleUserTitleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IUserAwardsUnion
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    refOpen: MutableRefObject<null>
}