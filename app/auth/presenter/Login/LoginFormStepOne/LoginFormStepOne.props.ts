import { DetailedHTMLProps, HTMLAttributes } from "react"

export type LoginFormStepOneProps = DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}