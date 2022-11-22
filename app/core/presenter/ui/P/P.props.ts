import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type PProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
    children?: ReactNode;
    size?: 'xs' | 's' | 'm' | 'l';
    fontstyle?: 'thin' | 'bold';
    color?: 'gray';
}