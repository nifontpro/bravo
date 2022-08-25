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
		<ImageDefault
			className={classname || "rounded-xl"}
			src={imageUrl}
			alt={text}
			layout="fixed"
			width={150}
			height={150}
			draggable={false}
			objectFit="cover"
			unoptimized
			priority
		/>
		<h2 className="text-xl py-3">{text}</h2>
	</div>
}

export default SidebarItem