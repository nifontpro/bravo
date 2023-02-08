
import { IDepartment } from '@/department/model/department.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterRatingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    departments: IDepartment[]
    departSort: string
    setDepartSort: Dispatch<SetStateAction<string>>
    state: 1 | -1
    setState: Dispatch<SetStateAction<1 | -1>>
    sortAward: boolean
    setSortAward: Dispatch<SetStateAction<boolean>>
}