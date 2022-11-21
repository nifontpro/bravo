import { ICompany } from '@/company/model/company.types';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type TitleSingleCompanyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    company: ICompany
}