import {FC} from 'react'
import Meta from "@/core/utils/meta/Meta";
import {IRewardInfo} from "../model/rewardInfo";
import MedalCard from "./MedalCard";
import {useAuthState} from "@/auth/data/auth.slice";
import {rewardApi} from "../data/reward.api";

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

	return <Meta title={`Награждение ${reward.name}`} description={`Подробности награждения`}>
		<div className="flex flex-col gap-4">
			<h1>Награждение: {reward.name}</h1>
			<MedalCard medal={reward.medal}/>
			{reward.description &&
				<h2>Описание: {rewardInfo.reward.description}</h2>
			}
			{reward.score &&
				<h2>Ценность: {rewardInfo.reward.score}</h2>
			}
			<h5>Дата номинирования: <span>{formatTime(reward.dateNominee)}</span></h5>

			Подписи членов номинационной комиссии:
			{mncSignatures.map((m, index) => {
				return <h5 key={m.mncId} className="flex items-center">
					{index + 1}. {m.lastname} {m.name} {m.patronymic}:
					<span className="px-3">{m.sign ? "Подписано" : "Не подписано"}</span>
					{(m.mncId == user?.id) &&
						<button
							className="btn-second"
							onClick={() => putSignature(reward.id)}
						>
							Подписать
						</button>}
				</h5>
			})}
			<h5>{allSignatures ? "Все подписи поставлены!" : "Не все подписали номинацию!"}</h5>
		</div>
	</Meta>
}

export default SingleReward