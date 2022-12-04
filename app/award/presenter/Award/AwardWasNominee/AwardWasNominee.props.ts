
import { IAwardUsers } from 'award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type AwardWasNomineeProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: IAwardUsers
}