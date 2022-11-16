import { DetailedHTMLProps, HTMLAttributes } from "react"

export type ArrowNextPrevProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    size: 's' | 'm' | 'l';
    direction: 'right' | 'left'
}