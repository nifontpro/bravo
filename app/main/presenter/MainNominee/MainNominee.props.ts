
import { IAward } from 'award/model/award.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type MainNomineeProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    awards: IAward[]
}