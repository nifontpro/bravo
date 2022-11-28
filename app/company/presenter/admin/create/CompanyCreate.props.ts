import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type CompanyCreateProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode
}