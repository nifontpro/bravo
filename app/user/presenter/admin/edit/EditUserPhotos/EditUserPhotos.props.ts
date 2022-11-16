import { ImageRef } from "@/core/model/image.types";
import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react"

export type EditUserPhotosProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    imagesArtem: ImageRef[] | undefined
    image: string | undefined
    setImageArtem: Dispatch<SetStateAction<ImageRef[] | undefined>>
}