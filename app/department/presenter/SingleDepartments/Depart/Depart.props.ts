
import { IDepartment } from '@/department/model/department.types'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type DepartProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    data: IDepartment
}