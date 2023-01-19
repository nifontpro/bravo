

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type StatisticAcrivityProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;

}