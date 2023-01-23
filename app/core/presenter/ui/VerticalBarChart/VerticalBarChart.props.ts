import { DetailedHTMLProps, HTMLAttributes } from "react"
import { DateMonth } from 'statistic/presenter/StatisticActivity/StatisticActivity.types'

export type VerticalBarChartProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    objNominees: DateMonth
    objAwards: DateMonth
}