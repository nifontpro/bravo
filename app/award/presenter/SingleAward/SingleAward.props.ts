
import { IAward } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type SingleAwardProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: IAward
}