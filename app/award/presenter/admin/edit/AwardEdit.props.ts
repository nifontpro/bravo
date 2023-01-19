import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type AwardEditProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode
}