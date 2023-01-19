
import { NextRouter } from 'next/router';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ResetPasswordProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    router: NextRouter
}