
import { IAward } from 'award/model/award.types'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type AwardPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: IAward
}