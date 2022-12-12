
import { IAward } from 'award/model/award.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type StatisticCountNomineeProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    awardsLight: IAward[]
}