import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type PProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    children: ReactNode;
    size?: 's' | 'm' | 'l';
}