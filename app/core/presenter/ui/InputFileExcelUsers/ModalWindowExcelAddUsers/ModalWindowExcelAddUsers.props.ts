
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, RefAttributes, SetStateAction } from "react"
import { DataSheets } from '../inputExls.types'

export type ModalWindowExcelAddUsersProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    textBtn: string
    data: DataSheets[] | undefined
    fileName: string
}