
import { IAwardUsers } from 'award/model/award.types'
import { IAwardRelateUser } from 'award/model/awardRelate.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type CardUserAwardedProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IAwardRelateUser
    award: IAwardUsers
}