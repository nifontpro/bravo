
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, MouseEvent, SetStateAction } from "react"

export type ChoiceImgEditProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    img: string | undefined
    removePhoto: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => Promise<void>
    setVisibleModal: Dispatch<SetStateAction<boolean>>
}   