import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ButtonToggleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode;
}