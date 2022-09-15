import {FC} from 'react'
import {IMedal} from "@/medal/model/medal.types";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const MedalCard: FC<{ medal: IMedal }> = ({medal}) => {
	return <div className="flex bg-white shadow-lg rounded-xl p-3">
		<ImageDefault
			src={medal.imageUrl}
			className="rounded-full"
			width={200}
			height={200}
			draggable={false}
			layout="fixed"
			objectFit="cover"
			priority
		/>
		<div className="my-5 flex flex-col mx-auto justify-center justify-between">
			<h3>Медаль</h3>
			<h5>{medal.name}</h5>
			<h5>{medal.description}</h5>
			<h5>Ценность: {medal.score}</h5>
		</div>
	</div>
}

export default MedalCard