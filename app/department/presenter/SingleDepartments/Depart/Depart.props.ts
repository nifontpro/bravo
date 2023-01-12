
import { IDepartment } from '@/department/model/department.types'
import { MotionProps } from 'framer-motion'
import { DetailedHTMLProps, HTMLAttributes, ReactNode, RefAttributes } from "react"

export type DepartProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> &{
    data: IDepartment
}