import {FC} from "react";
import {ImageProps} from "next/dist/client/image";
import Image, {ImageLoaderProps} from "next/image";
import {BASE_URL} from "@/core/config/api.config";
import defaultImage from '@/core/presenter/images/default.jpg'

type ImageDefaultProps = Omit<ImageProps, "src"> & {
	src?: string
}

const imageLoader = ({src}: ImageLoaderProps) => {
	return `${BASE_URL}/${src}`
	// return `https://medals.nifontbus.keenetic.pro/${src}`
}

export const ImageDefault: FC<ImageDefaultProps> = (
	{
		src, alt, layout, draggable, priority,
		width, height, objectFit, className
	}
) => {
	return src ?
		<Image
			className={className}
			// src={src ? src : 'profile_pictures/default.jpg'}
			src={src ? src : 'profile_pictures/default.jpg'}
			alt={alt}
			width={width}
			height={height}
			layout={layout}
			draggable={draggable}
			priority={priority}
			objectFit={objectFit}
			loader={imageLoader}/>
		:
		<Image
			src={defaultImage}
			width={width}
			height={height}
			alt="Default"
			draggable={false}
			layout={layout}
			priority={priority}
			objectFit={objectFit}
		/>

}
