import { DetailedHTMLProps, HTMLAttributes } from "react"

export type LoginFormStepTwoProps = DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}