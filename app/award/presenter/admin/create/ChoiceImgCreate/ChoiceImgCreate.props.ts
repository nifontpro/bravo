
import { IGalleryObject } from 'gallery/model/gallery.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type ChoiceImgCreateProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    images: IGalleryObject | undefined
    setImg: Dispatch<SetStateAction<IGalleryObject | undefined>>
}   