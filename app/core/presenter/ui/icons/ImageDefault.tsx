import {FC} from "react";
import {ImageProps} from "next/dist/client/image";
import Image, {ImageLoaderProps} from "next/image";
import {BASE_URL} from "@/core/config/api.config";

type ImageDefaultProps = Omit<ImageProps, "src"> & {
	src?: string
}

const imageLoader = ({src}: ImageLoaderProps) => {
	return `${BASE_URL}/${src}`
}

export const ImageDefault: FC<ImageDefaultProps> = (
	{src, alt,  layout, draggable, priority,
	width, height, objectFit, className}
) => {
	return <Image
		className={className}
		src={src ? src : 'profile_pictures/default.jpg'}
		alt={alt}
		width={width}
		height={height}
		layout={layout}
		draggable={draggable}
		priority={priority}
		objectFit={objectFit}
		loader={imageLoader}/>
}
