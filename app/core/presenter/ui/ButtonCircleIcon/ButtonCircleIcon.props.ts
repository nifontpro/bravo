import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import plus from './plus.svg'
import down from './down.svg'
import dots from './dots.svg'

export const icons = {
    plus,
    down,
    dots
}

export type IconName = keyof typeof icons

export type ButtonCircleIconProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    appearance: 'black' | 'transparent';
    icon: IconName
    children?: ReactNode
}