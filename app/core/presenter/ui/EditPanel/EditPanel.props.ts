import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type EditPanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean
    deleteAsync:(id: string) => void
    URL: string
}