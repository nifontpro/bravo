
import { IAwardRelateUser } from 'award/model/awardRelate.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type CardNomineeProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IAwardRelateUser
    awardId: string
}