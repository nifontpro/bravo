
import { IAward, IAwardUsers } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type AwardProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: IAwardUsers
}