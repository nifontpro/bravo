import {FC} from "react";
import {ImageProps} from "next/dist/client/image";
import Image, {ImageLoaderProps} from "next/image";
import {BASE_URL} from "@/core/config/api.config";

type ImageDefaultProps = Omit<ImageProps, "src"> & {
	src: string | null
}

const imageLoader = ({src}: ImageLoaderProps) => {
	return `${BASE_URL}/${src}`
}

export const ImageDefault: FC<ImageDefaultProps> = (
	{src, alt,  layout, draggable, priority}
) => {
	return <Image
		src={src ? src : 'profile_pictures/default.jpg'}
		alt={alt}
		layout={layout}
		draggable={draggable}
		priority={priority}
		loader={imageLoader}/>
}
