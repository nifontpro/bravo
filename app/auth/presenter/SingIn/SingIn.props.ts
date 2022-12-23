import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SingInProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}