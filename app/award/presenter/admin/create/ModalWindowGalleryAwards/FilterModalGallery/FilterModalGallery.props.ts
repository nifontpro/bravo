

import { IGalleryObject } from 'gallery/model/gallery.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterModalGalleryProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    images: IGalleryObject | undefined
    setImg: Dispatch<SetStateAction<IGalleryObject | undefined>> | undefined
}