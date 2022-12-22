import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type PasswordRecoveryProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}