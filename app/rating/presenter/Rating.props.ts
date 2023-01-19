import { ICompany } from '@/company/model/company.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type RatingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    company: ICompany
}