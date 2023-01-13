
import { IMessage } from '@/message/model/message.types'
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export type NotificationProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    allMessage: IMessage[] | undefined
}