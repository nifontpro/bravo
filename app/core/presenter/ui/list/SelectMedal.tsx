import React, {FC, useState} from 'react'
import MedalItem from "@/core/presenter/ui/list/MedalItem";
import {IMedal} from "@/medal/model/medal.types";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const SelectMedal: FC<{ medals: IMedal[], onClick: (medal: IMedal) => void }> = ({medals, onClick}) => {

	const [isShowList, setShowList] = useState(false)
	const handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setShowList(true)
	}

	const [medal, setMedal] = useState<IMedal | undefined>(undefined)

	return (
		<div
			className="border-2 border-gray-500 max-h-[28rem] flex flex-wrap justify-evenly py-3 overflow-y-auto items-center">

			{isShowList ? medals.map((medal) => (
					<div
						key={medal.id}
						onClick={() => {
							setShowList(false)
							setMedal(medal)
							onClick(medal)
						}}>
						<MedalItem
							medal={medal}
						/>
					</div>
				))
				:
				<div>
					<button onClick={handleShow} className="m-3 btn-second">
						Выберите медаль из списка
					</button>
					{medal ?
						<div className="flex flex-col items-center gap-4">
							Выбранная медаль: {medal?.name}
							<ImageDefault
								className="rounded-full animate-fade"
								src={medal.imageUrl}
								alt={medal.name}
								layout="fixed"
								width={120}
								height={120}
								objectFit="contain"
								draggable={false}
							/>
							Ценность медали: {medal.score}
						</div>
						:
						<div>
							Медаль не выбрана
						</div>}
				</div>
			}
		</div>
	)
}

export default SelectMedal