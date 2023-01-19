import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react"

export type RangeCalendarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    setStartDate: Dispatch<SetStateAction<number>>
    setEndDate: Dispatch<SetStateAction<number>>
}