import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type AwardCreateProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode
}