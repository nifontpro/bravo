import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import main from './mainMenu.svg'
import company from './company.svg'
import help from './helpMenu.svg'
import rating from './ratingMenu.svg'
import statistic from './statisticMenu.svg'
import awards from './awardsMenu.svg'

export const icons = {
    main,
    company,
    help,
    rating,
    statistic,
    awards,
}

export type IconName = keyof typeof icons

export type ButtonMenuIconProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    // appearance: 'black' | 'transparent';
    icon: IconName
    children?: ReactNode
}