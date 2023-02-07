import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react"

export type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    setNavigationVisible: Dispatch<SetStateAction<boolean>>
    navigationVisible: boolean
}