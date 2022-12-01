import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ButtonRadioProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children: ReactNode;
}