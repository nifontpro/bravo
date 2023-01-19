import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type DoughnutCircleProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    dataOne: number
    dataTwo: number
    colorOne: string
    colorTwo: string
}