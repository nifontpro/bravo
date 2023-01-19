import {FC} from 'react'
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

interface SidebarItemProps {
	classname?: string
	imageUrl?: string
	alt?: string
	text?: string
}

const SidebarItem: FC<SidebarItemProps> = (
	{classname, imageUrl, text}) => {
	return <div>
		<a>
			<ImageDefault
				className={classname}
				src={imageUrl}
				alt={text}
				layout="fill"
				draggable={false}
				objectFit="cover"
				unoptimized
				// priority={true}
			/>
		</a>
		<h2 className="text-xl py-3">{text}</h2>
	</div>
}

export default SidebarItem