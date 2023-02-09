import { IAwardUsers } from '@/award/model/award.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    state: 1 | -1
    setState: Dispatch<SetStateAction<1 | -1>>
    active: '' | 'NOMINEE' | 'AWARD' | 'DELETE_USER'
    setActive: Dispatch<SetStateAction<'' | 'NOMINEE' | 'AWARD' | 'DELETE_USER'>>
    allNominee: IAwardUsers[] | undefined
    allAwards: IAwardUsers[] | undefined
    awardsFull: IAwardUsers[] | undefined
}