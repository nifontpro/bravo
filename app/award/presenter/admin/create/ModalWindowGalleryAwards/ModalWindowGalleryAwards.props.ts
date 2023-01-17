
import { IUser } from '@/user/model/user.types'
import { IGalleryObject } from 'gallery/model/gallery.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type ModalWindowGalleryAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    textBtn: string
    img?: IGalleryObject | undefined
    setImg?: Dispatch<SetStateAction<IGalleryObject | undefined>>
    create: boolean
}