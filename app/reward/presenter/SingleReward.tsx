import {FC} from 'react'
import Meta from "@/core/utils/meta/Meta";
import {IRewardInfo} from "../model/rewardInfo";
import MedalCard from "./MedalCard";
import {useAuthState} from "@/auth/data/auth.slice";
import {rewardApi} from "../data/reward.api";
import Button from "@/core/presenter/ui/form/Button";

export function formatTime(s: number): string {
	const date = new Date(s)
	return new Intl.DateTimeFormat('ru-RU',
		{
			year: 'numeric', month: 'long', day: 'numeric',
			hour: "numeric", minute: "numeric"
		}).format(date)
}

const SingleReward: FC<{ rewardInfo: IRewardInfo }> = ({rewardInfo}) => {

	const {reward, mncSignatures, allSignatures} = rewardInfo
	const {user} = useAuthState()

	const [putSignature] = rewardApi.usePutSignatureMutation()
	const [active] = rewardApi.useActiveMutation()

	return <Meta title={`Награждение ${reward.name}`} description={`Подробности награждения`}>
		<div className="flex-col">
			<h1 className="mb-5">Награждение: {reward.name}</h1>
			<MedalCard medal={reward.medal}/>
			{reward.description &&
				<h2>Описание: {rewardInfo.reward.description}</h2>
			}
			{reward.score &&
				<h2 className="my-5">Ценность: {rewardInfo.reward.score}</h2>
			}
			<div className="flex flex-col items-start">

				<h5>Дата номинирования: <span>{formatTime(reward.dateNominee)}</span></h5>
				<h6 className="mt-5">Подписи членов номинационной комиссии:</h6>
				{mncSignatures.map((m, index) => {
					return <h5 key={m.mncId} className="flex items-center">
						{index + 1}. {m.lastname} {m.name} {m.patronymic}:
						<span className="px-3">{m.sign ? "Подписано" : "Не подписано"}</span>
						{(m.mncId == user?.id && !m.sign) &&
							<button
								className="btn-second"
								onClick={() => putSignature(reward.id)}
							>
								Подписать
							</button>}
					</h5>
				})}
				<h5 className="mt-3">{allSignatures ? "Все подписи поставлены!" : "Не все подписали номинацию!"}</h5>
			</div>
			{allSignatures &&
				<Button className="mt-5" onClick={() => active(reward.id)}>
					Утвердить премию
				</Button>
			}
		</div>
	</Meta>
}

export default SingleReward