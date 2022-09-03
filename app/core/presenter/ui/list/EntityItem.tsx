import {FC} from 'react'
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";
import {IMedal} from "@/medal/model/medal.types";

const EntityItem: FC<{ medal: IMedal }> = ({medal}) => {

	return (
		<div className="flex w-80 h-40 rounded-xl bg-white shadow-lg my-3 overflow-hidden m-2">
			<ImageDefault
				className="flex w-1/3 rounded-xl"
				src={medal.imageUrl}
				alt={medal.name}
				layout="intrinsic"
				width={120}
				height={120}
				objectFit="cover"
				draggable={false}
			/>
			<div className="w-2/3 p-6 flex flex-col text-center">
				<h5 className="text-gray-900 text-xl font-medium mb-2">{medal.name}</h5>
				<p className="text-gray-700 text-base mb-4">
					Ценность: {medal.score}
				</p>
				<p className="text-gray-600 text-xs">{medal.description}</p>
			</div>
		</div>
	)
}

export default EntityItem
