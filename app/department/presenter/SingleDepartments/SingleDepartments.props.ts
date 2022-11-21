
import { IDepartment } from '@/department/model/department.types'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SingleDepartmentsProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    data: IDepartment[] | undefined
    prefix: string,
}