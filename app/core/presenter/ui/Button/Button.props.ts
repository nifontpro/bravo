import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children: ReactNode;
    appearance: 'white' | 'gray' | 'blackWhite' | 'blackGray';
    size: 's' | 'm' | 'l' | 'x';
}