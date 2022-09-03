import {FC} from 'react'
import EntityItem from "@/core/presenter/ui/list/EntityItem";
import {IMedal} from "@/medal/model/medal.types";

const EntityList: FC<{ medals: IMedal[], onClick: (medal: IMedal) => void }> = ({medals, onClick}) => {
	return (

		<div
			className="border-2 border-primary max-h-[28rem] flex flex-wrap justify-evenly py-3 overflow-y-auto items-center">
			{medals.map((medal) => (
				<div key={medal.id} onClick={() => onClick(medal)}>
					<EntityItem
						medal={medal}
					/>
				</div>
			))}
		</div>
	)
}

export default EntityList