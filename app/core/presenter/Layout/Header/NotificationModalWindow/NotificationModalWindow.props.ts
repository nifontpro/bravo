
import { IUser } from '@/user/model/user.types'
import { IMessage } from 'message/model/message.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type NotificationModalWindowProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    message: IMessage[] | undefined
}