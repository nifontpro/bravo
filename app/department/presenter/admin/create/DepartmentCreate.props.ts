import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type DepartmentCreateProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode
}